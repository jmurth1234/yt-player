import React, { useContext, useMemo, useState } from 'react'
import Head from '../../components/head'
import classNames from 'classnames'
import { AudioContext } from '../../lib/audio-context'
import dynamic from 'next/dynamic'

import Song from '../../components/song'
import { getYoutube } from '../../lib/youtube-retriever'
import getAudioUrl from '../../lib/audio-url'
import styles from './Player.module.scss'

const PlayIcon = dynamic(() => import('../../components/play-icon'))
const BlurredBackground = dynamic(() =>
  import('../../components/blurhash').then((c) => c.BlurredBackground)
)
const HashImage = dynamic(() =>
  import('../../components/blurhash').then((c) => c.HashImage)
)
const Slider = dynamic(() => import('rc-slider'))
const Range = dynamic(() => import('rc-slider').then((module) => module.Range))

const Player = ({ result }) => {
  const {
    nowPlaying,
    isPlaying,
    togglePlaying,
    volume,
    currentTime,
    setNowPlaying,
    currentBuffered,
    setPosition,
    setVolume,
  } = useContext(AudioContext)

  const currentSong = { ...nowPlaying, ...result }

  const url = getAudioUrl(result)

  const [localPos, setLocalPos] = useState({ pos: 0, changing: false })
  const [showingRelated, setRelated] = useState(false)

  useMemo(() => {
    if (!url || (nowPlaying && nowPlaying.id === result.id)) {
      return
    }

    setNowPlaying({
      ...result,
      url,
    })
    setLocalPos({ pos: 0, changing: false })
  }, [url, nowPlaying, result])

  const changeVal = (pos) => {
    setLocalPos({ pos: pos[1], changing: true })
  }

  const setVal = () => {
    setPosition(localPos.pos)
    setLocalPos({ changing: false, pos: localPos.pos })
  }

  const toggleRelated = () => {
    setRelated(!showingRelated)
  }

  const thumbnail = currentSong.thumb || 'https://placehold.it/640x360'

  return (
    <div className={classNames(styles.container, 'container')}>
      <Head title="Now Playing" />

      <div className={classNames(styles.area, styles.playerArea)}>
        <div className={styles.infoArea}>
          <div className={styles.thumb}>
            <HashImage
              width={500}
              height={280}
              src={thumbnail}
              hash={currentSong.blurHash}
            />
          </div>

          <div className={styles.hero}>
            <h3>{currentSong.title || 'Loading...'}</h3>
            <a href={currentSong.channelUrl}>
              <p>{currentSong.channelName}</p>
            </a>
          </div>

          {currentSong.length != 0 && (
            <div className={styles.sliderContainer}>
              <Range
                count={2}
                min={0}
                max={currentSong.length}
                step={0.01}
                defaultValue={[0, 0, 0]}
                value={[
                  0,
                  localPos.changing ? localPos.pos : currentTime,
                  currentBuffered,
                ]}
                onChange={changeVal}
                onAfterChange={setVal}
              />
            </div>
          )}
        </div>

        <div className={styles.controls}>
          <div className={styles.buttons}>
            <button className={styles.primary} onClick={togglePlaying}>
              <PlayIcon isPlaying={isPlaying} />
            </button>
          </div>

          <div className={styles.sliderContainer}>
            <label>Volume: {Math.round(volume * 100)}</label>
            <Slider
              min={0}
              max={1}
              step={0.01}
              defaultValue={1}
              value={volume}
              onChange={setVolume}
            />
          </div>
        </div>

        <div className={classNames(styles.controls, styles.secondary)}>
          <button className={styles.secondary} onClick={toggleRelated}>
            Show Related
          </button>
        </div>
      </div>
      {currentSong.related && (
        <div
          className={classNames(
            styles.area,
            styles.infoArea,
            styles.relatedArea,
            {
              [styles.onScreen]: showingRelated,
            }
          )}
        >
          <div className={styles.relatedHeader}>
            <h3>Related</h3>
            <button className={styles.secondary} onClick={toggleRelated}>
              Close
            </button>
          </div>
          <div className={styles.relatedBody}>
            {currentSong.related &&
              currentSong.related.map((video, i) => (
                <div className={styles.songContainer} key={i}>
                  <Song video={video} replace />
                </div>
              ))}
          </div>
        </div>
      )}

      <BlurredBackground hash={currentSong.blurHash} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { query, res } = context
  const id = query && query.v

  if (res && !id) {
    res.writeHead(302, {
      Location: '/',
    })
    res.end()
  }

  if (!id) {
    return {}
  }

  const url = `https://youtube.com/watch?v=${id}`
  const result = await getYoutube(url, false)

  return { props: { result } }
}

export default Player

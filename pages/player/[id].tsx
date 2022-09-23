import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { Wave } from "@foobar404/wave"

import Head from '../../components/head'
import Song from '../../components/song'
import { getYoutube, Video } from '../../lib/youtube-retriever'
import { AudioContext } from '../../lib/audio-context'
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
    minimalUI,
    setMinimalUI,
  } = useContext(AudioContext)

  const currentSong: Video = { ...nowPlaying, ...result }

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const url = getAudioUrl(result)
  const [wave, setWaveArea] = useState<Wave | null>(null);

  const [showingRelated, setRelated] = useState(false)

  const handleVisualisation = () => {
    if (typeof window !== 'undefined') {
      const canvas = canvasRef.current
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      let localWave = wave;

      if (!localWave) {
        localWave = new Wave(
          document.getElementById('audioElem') as HTMLAudioElement,
          canvas,
        )
        setWaveArea(localWave);
      }

      localWave.clearAnimations();

      localWave.addAnimation(new localWave.animations.Glob({
        fillColor: currentSong.colours[0],
      }))

      localWave.addAnimation(new localWave.animations.Turntable({
        fillColor: currentSong.colours[1],
      }))
    }
  }

  useMemo(() => {
    if (!url || (nowPlaying && nowPlaying.id === result.id)) {
      return
    }

    setNowPlaying({
      ...result,
      url,
    })
    setPosition(0)

    handleVisualisation()
  }, [url, nowPlaying, result])

  useEffect(() => {
    function handleResize() {
      handleVisualisation()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const changeVal = (pos) => {
    if (pos[1] === currentTime) return

    setPosition(pos[1])
  }

  const toggleRelated = () => {
    setRelated(!showingRelated)
  }

  const thumbnail = currentSong.thumb || 'https://placeholder.com/640x360'

  return (
    <div className={classNames(styles.container, 'container')}>
      <Head title="Now Playing" />

      {!minimalUI && (
        <div className={classNames(styles.area, styles.playerArea)}>
          <div className={styles.infoArea}>
            <div className={styles.thumb}>
              <HashImage
                width={500}
                height={280}
                src={thumbnail}
                hash={currentSong.blurHash}
                eager
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
                  value={[0, currentTime, currentBuffered]}
                  onChange={changeVal}
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

          <div className={classNames(styles.controls)}>
            <button className={styles.secondary} onClick={toggleRelated}>
              Show Related
            </button>
            <button onClick={() => setMinimalUI(!minimalUI)}>
              Minimum UI
            </button>
          </div>
        </div>
      )}

      {minimalUI && (
        <div className={classNames(styles.middleArea)}>
          <div className={styles.controls}>          
            <button onClick={() => setMinimalUI(!minimalUI)}>
              Full UI
            </button>
          </div>
        </div>
      )}

      {currentSong.related && !minimalUI && (
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
              currentSong.related.map((video) => (
                <div className={styles.songContainer} key={video.id}>
                  <Song video={video} replace />
                </div>
              ))}
          </div>
        </div>
      )}

      <canvas id="canvas" ref={canvasRef} className={styles.canvas} />

      <BlurredBackground hash={currentSong.blurHash} waveOnly={minimalUI} />
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params, res } = context
  const id = params && params.id

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

  return { props: { result }, revalidate: 600 }
}

export default Player

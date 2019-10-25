import React, { useContext, useMemo, useState } from 'react'
import Head from '../components/head'
import player from '../styles/player-page'
import audioContext from '../lib/audio-context'
import axios from 'axios'
import dynamic from 'next/dynamic'

import Slider, { Range } from 'rc-slider'
import Song from '../components/song'
import { getYoutube } from '../lib/youtube-retriever'

const PlayIcon = dynamic(() => import('../components/play-icon'))
const isClient = typeof window !== 'undefined'

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
    setVolume
  } = useContext(audioContext)

  const currentSong = { ...result, ...nowPlaying }

  const url =
    result &&
    `${
      process.env.IS_NOW ? 'https://yt-player.rymate.co.uk' : ''
    }/api/stream-youtube?id=${result.id}`

  const [localPos, setLocalPos] = useState({ pos: 0, changing: false })
  const [showingRelated, setRelated] = useState(false)

  useMemo(() => {
    if (!url || nowPlaying.id === result.id) {
      return
    }

    setNowPlaying({
      ...result,
      url
    })
    setLocalPos({ pos: 0, changing: false })
  }, [url])

  const changeVal = pos => {
    setLocalPos({ pos: pos[1], changing: true })
  }

  const setVal = () => {
    setPosition(localPos.pos)
    setLocalPos({ changing: false })
  }

  const toggleRelated = () => {
    setRelated(!showingRelated)
  }

  return (
    <div className="center">
      <Head title="Now Playing" />

      <div className="playerArea">
        <div className="infoArea">
          <div>
            <img src={currentSong.thumb} />
          </div>

          <div className="hero">
            <h3 className="title">{nowPlaying.title}</h3>
            <a href={currentSong.channelUrl} className="description">
              <p>{currentSong.channelName}</p>
            </a>
          </div>

          {currentSong.length != 0 && (
            <div className="sliderContainer">
              <Range
                count={2}
                min={0}
                max={currentSong.length}
                step={0.01}
                defaultValue={[0, 0, 0]}
                value={[
                  0,
                  localPos.changing ? localPos.pos : currentTime,
                  currentBuffered
                ]}
                onChange={changeVal}
                onAfterChange={setVal}
              />
            </div>
          )}
        </div>

        <div className="controls">
          <div className="buttons">
            <button className="primary" onClick={togglePlaying}>
              <PlayIcon isPlaying={isPlaying} />
            </button>
          </div>

          <div className="sliderContainer">
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

        <div className="controls relatedButton">
          <button className="secondary" onClick={toggleRelated}>
            Show Related
          </button>
        </div>
      </div>
      <div className={`relatedArea infoArea ${showingRelated && 'on-screen'}`}>
        <div className="relatedHeader">
          <h3>Related</h3>
          <button className="secondary" onClick={toggleRelated}>
            Close
          </button>
        </div>
        <div className="relatedBody">
          {currentSong.related &&
            currentSong.related.map(video => (
              <span className="songContainer">
                <Song video={video} replace />
              </span>
            ))}
        </div>
      </div>

      <style jsx>{player}</style>
      <style jsx>{`
      .center:before {
        content: "";
        position: fixed;
        z-index: -1;

        display: block;
        background-image: url('${currentSong.thumb}');
        background-size: cover;
        background-position: center; 
        width: 150%;
        height: 150%;

        filter: blur(20px);
      }    
    `}</style>
    </div>
  )
}

Player.getInitialProps = async context => {
  const { query, res } = context
  const id = query && query.v

  if (res && !id) {
    res.writeHead(302, {
      Location: '/'
    })
    res.end()
  }

  if (!id) {
    return {}
  }

  const url = `https://youtube.com/watch?v=${id}`
  let result
  if (isClient) {
    const req = await axios.post(`/api/info`, { url })
    result = await req.data
  } else {
    result = await getYoutube(url)
    res.setHeader('Cache-Control', 's-maxage=0, stale-while-revalidate')
  }
  return { result }
}

export default Player

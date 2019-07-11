import React, { useContext, useMemo, useState } from 'react'
import Head from '../components/head'
import player from '../styles/player-page'
import audioContext from '../lib/audio-context'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

import Slider, { Range } from 'rc-slider'
import Song from '../components/song'

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

  const url = result && `/api/stream-youtube?id=${result.id}`

  const [localPos, setLocalPos] = useState({ pos: 0, changing: false })

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

  const playingIcon = isPlaying ? faPause : faPlay

  console.log(
    localPos.changing ? localPos.pos : currentTime,
    localPos.changing,
    localPos.pos,
    currentTime
  )

  return (
    <div className="center">
      <Head title="Now Playing" />

      <div className="playerArea">
        <div className="infoArea">
          <div>
            <img src={nowPlaying.thumb} />
          </div>

          <div className="hero">
            <h3 className="title">{nowPlaying.title}</h3>
            <a href={nowPlaying.channelUrl} className="description">
              <p>{nowPlaying.channelName}</p>
            </a>
          </div>

          {nowPlaying.length != 0 && (
            <div className="sliderContainer">
              <Range
                count={2}
                min={0}
                max={nowPlaying.length}
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
              <FontAwesomeIcon size="lg" icon={playingIcon} />
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
      </div>
      <div className="relatedArea infoArea">
        <h3>Related</h3>
        {nowPlaying.related &&
          nowPlaying.related.map(video => (
            <span className="songContainer">
              <Song video={video} replace />
            </span>
          ))}
      </div>

      <style jsx>{player}</style>
      <style jsx>{`
      .center:before {
        content: "";
        position: fixed;
        z-index: -1;

        display: block;
        background-image: url('${nowPlaying.thumb}');
        background-size: cover;
        background-position: center; 
        width: 150%;
        height: 150%;

        filter: blur(50px);
      }    
    `}</style>
    </div>
  )
}

Player.getInitialProps = async ({ query, res }) => {
  const id = query && query.v

  if (res && !id) {
    res.redirect('/')
  }

  if (!id) {
    return {}
  }

  const host = isClient ? '' : 'http://127.0.0.1:' + (process.env.PORT || 3000)
  const req = await axios.post(`${host}/api/info`, {
    url: `https://youtube.com/watch?v=${id}`
  })
  const result = await req.data
  return { result }
}

export default Player

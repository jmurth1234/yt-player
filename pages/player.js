import React, { useContext, useMemo } from 'react'
import Head from '../components/head'
import player from '../styles/player-page'
import audioContext from '../lib/audio-context'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

import Slider, { Range } from 'rc-slider'
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
  useMemo(() => {
    if (!url || nowPlaying.id === result.id) {
      return
    }

    setNowPlaying({
      ...result,
      url
    })
  }, [url])

  const playingIcon = isPlaying ? faPause : faPlay
  return (
    <div className="center">
      <Head title="Now Playing" />

      <div className="infoArea">
        <div>
          <img src={nowPlaying.largeThumb} />
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
              value={[0, currentTime, currentBuffered]}
              onChange={pos => setPosition(pos[1])}
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

      <style jsx>{player}</style>
      <style jsx>{`
      .center:before {
        content: "";
        position: fixed;
        z-index: -1;

        display: block;
        background-image: url('${nowPlaying.largeThumb}');
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

  const req = await axios.post(
    `${isClient ? '' : 'http://127.0.0.1:' + process.env.PORT}/api/info`,
    { url: `https://youtube.com/watch?v=${id}` }
  )
  const result = await req.data
  return { result }
}

export default Player

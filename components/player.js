import React, { Fragment, useContext } from 'react'
import audioContext from '../lib/audio-context'
import audioStyle from '../styles/mini-player'
import { fixedBar } from '../styles/shared'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

function AudioPlayer({ hidden }) {
  const { nowPlaying, isPlaying, togglePlaying } = useContext(audioContext)

  const playingIcon = isPlaying ? faPause : faPlay

  const offscreen = hidden || !nowPlaying.url ? 'offscreen' : ''

  return (
    <Fragment>
      <div className={`player fixedBar bottom ${offscreen}`}>
        <img src={nowPlaying.thumb} />
        <Link href="/player">
          <div className="cardInfo">
            <p className="cardTitle">{nowPlaying.title}</p>
            <p>{nowPlaying.channelName}</p>
          </div>
        </Link>

        <button onClick={togglePlaying}>
          <FontAwesomeIcon size="lg" icon={playingIcon} />
        </button>
      </div>
      <style jsx>{fixedBar}</style>
      <style jsx>{audioStyle}</style>
    </Fragment>
  )
}

export default AudioPlayer

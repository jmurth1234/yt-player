import React, { Fragment, useContext } from 'react'
import audioContext from '../lib/audio-context'
import audioStyle from '../styles/mini-player'
import { fixedBar } from '../styles/shared'
import Song from './song'
import dynamic from 'next/dynamic'

const PlayIcon = dynamic(() => import('./play-icon'))

function AudioPlayer({ hidden }) {
  const { nowPlaying, isPlaying, togglePlaying } = useContext(audioContext)

  const offscreen = hidden || !nowPlaying.url ? 'offscreen' : ''

  return (
    <Fragment>
      <div className={`player fixedBar bottom ${offscreen}`}>
        {!hidden && (
          <>
            <Song video={nowPlaying} />

            <button onClick={togglePlaying}>
              <PlayIcon isPlaying={isPlaying} />
            </button>
          </>
        )}
      </div>
      <style jsx>{fixedBar}</style>
      <style jsx>{audioStyle}</style>
    </Fragment>
  )
}

export default AudioPlayer

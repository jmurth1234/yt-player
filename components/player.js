import React, { Fragment, useContext } from 'react'
import audioContext from '../lib/audio-context'
import audioStyle from '../styles/player'

function AudioPlayer() {
  const audio = useContext(audioContext)

  return (
    <Fragment>
      <audio className='player' autoPlay controls src={audio.url}>
        Your browser does not support the audio tag.
      </audio>
      <style jsx>{audioStyle}</style>
    </Fragment>
  )
}

export default AudioPlayer

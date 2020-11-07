import React, { Fragment, useContext } from 'react'
import { AudioContext } from '../../lib/audio-context'
import styles from './Player.module.scss'
import classNames from 'classnames'
import Song from '../song'
import dynamic from 'next/dynamic'

const PlayIcon = dynamic(() => import('../play-icon'))

function AudioPlayer({ hidden }) {
  const { nowPlaying, isPlaying, togglePlaying } = useContext(AudioContext)

  const offscreen = hidden || !nowPlaying || !nowPlaying.url

  if (offscreen) return null

  return (
    <div
      className={classNames(
        styles.player,
        { [styles.offscreen]: offscreen },
        'fixedBar',
        'botton'
      )}
    >
      <Song video={nowPlaying} eager />

      <button onClick={togglePlaying}>
        <PlayIcon isPlaying={isPlaying} />
      </button>
    </div>
  )
}

export default AudioPlayer

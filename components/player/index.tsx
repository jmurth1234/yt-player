import React, { Fragment, useContext } from 'react'
import { AudioContext } from '../../lib/audio-context'
import styles from './Player.module.scss'
import classNames from 'classnames'
import Song from '../song'
import dynamic from 'next/dynamic'

const PlayIcon = dynamic(() => import('../play-icon'))

function AudioPlayer({ hidden }) {
  const { nowPlaying, isPlaying, togglePlaying, minimalUI, loading, setMinimalUI } = useContext(AudioContext)

  const offscreen = (hidden && !minimalUI) || !nowPlaying || !nowPlaying.url

  const showFullUI = () => {
    setMinimalUI(false)
  }

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
      <Song video={nowPlaying} eager onClick={minimalUI ? showFullUI : undefined} />

      <button onClick={togglePlaying}>
        <PlayIcon isPlaying={isPlaying} isLoading={loading} />
      </button>
    </div>
  )
}

export default AudioPlayer

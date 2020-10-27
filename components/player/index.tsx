import React, { Fragment, useContext } from 'react'
import audioContext from '../../lib/audio-context'
import styles from './Player.module.scss'
import classNames from 'classnames'
import Song from '../song'
import dynamic from 'next/dynamic'

const PlayIcon = dynamic(() => import('../play-icon'))

function AudioPlayer({ hidden }) {
  const { nowPlaying, isPlaying, togglePlaying } = useContext(audioContext)

  const offscreen = hidden || !nowPlaying.url

  return (
    <Fragment>
      <div
        className={classNames(styles.player, { [styles.offscreen]: offscreen }, 'fixedBar', 'botton')}
      >
        {!hidden && (
          <>
            <Song video={nowPlaying} />

            <button onClick={togglePlaying}>
              <PlayIcon isPlaying={isPlaying} />
            </button>
          </>
        )}
      </div>
    </Fragment>
  )
}

export default AudioPlayer

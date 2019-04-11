import React, { Fragment, useContext, useRef, useState } from 'react'
import Head from '../components/head'
import player from '../styles/player-page'
import audioContext from '../lib/audio-context'

const Player = () => {
  const { nowPlaying } = useContext(audioContext)

  return (
    <div className='center'>
      <Head title="Now Playing" />
  
      <div className='infoArea'>
        <div>
          <img src={nowPlaying.largeThumb} />
        </div>

        <div className="hero">
          <h3 className="title">{nowPlaying.title}</h3>
          <a href={nowPlaying.channelUrl} className="description">
            <p>{nowPlaying.channelName}</p>
          </a>
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

export default Player

import React from 'react'
import Nav from '../components/nav'
import AudioContext from '../lib/audio-context'
import Player from '../components/player'

import 'rc-slider/assets/index.css'
import '../styles/global.scss'

import { AppProps } from 'next/app'

class YTApp extends React.Component<AppProps> {
  state = {
    nowPlaying: {
      url: ""
    },
    playing: false,
    volume: 1,
    currentTime: 0,
    currentBuffered: 0
  }

  audio = React.createRef<HTMLAudioElement>()

  setNowPlaying = (nowPlaying: any) => this.setState({ nowPlaying })
  setPlaying = playing => this.setState({ playing })
  setVolume = () => this.setState({ volume: this.audio.current.volume })
  setCurrentTime = () => {
    this.setState({
      currentTime: this.audio.current.currentTime,
      currentBuffered: this.audio.current.buffered.length
        ? this.audio.current.buffered.end(0)
        : 0
    })
  }

  render() {
    const { Component, pageProps, router } = this.props
    const audioContext = {
      nowPlaying: this.state.nowPlaying,
      isPlaying: this.state.playing,
      volume: this.state.volume,
      setNowPlaying: this.setNowPlaying,
      currentTime: this.state.currentTime,
      currentBuffered: this.state.currentBuffered,
      setVolume: (vol: number) => {
        this.audio.current.volume = vol
      },
      setPosition: (pos: number) => {
        this.audio.current.currentTime = pos
      },
      togglePlaying: () => {
        if (this.state.playing) {
          this.audio.current.pause()
        } else {
          this.audio.current.play()
        }
      }
    }

    const hidden = router.pathname.includes('player')

    return (
      <AudioContext.Provider value={audioContext}>
        <>
          <Nav hidden={hidden} />
          <div className="full-height">
            <Component {...pageProps} key={router.route} />
          </div>
          <Player hidden={hidden} />

          <audio
            autoPlay
            src={audioContext.nowPlaying.url}
            ref={this.audio}
            onPlaying={() => this.setPlaying(true)}
            onPause={() => this.setPlaying(false)}
            onVolumeChange={() => this.setVolume()}
            onTimeUpdate={() => this.setCurrentTime()}
            preload='auto'
          >
            Your browser does not support the audio tag.
          </audio>

          <style jsx global>{`

          `}</style>
        </>
      </AudioContext.Provider>
    )
  }
}

export default YTApp
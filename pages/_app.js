import React from 'react'
import App from 'next/app'
import Nav from '../components/nav'
import AudioContext from '../lib/audio-context'
import Player from '../components/player'

import 'rc-slider/assets/index.css'
class YTApp extends App {
  state = {
    nowPlaying: {},
    playing: false,
    volume: 1,
    currentTime: 0,
    currentBuffered: 0
  }

  audio = React.createRef()

  setNowPlaying = nowPlaying => this.setState({ nowPlaying })
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
      setVolume: vol => {
        this.audio.current.volume = vol
      },
      setPosition: pos => {
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
            .full-height {
              height: 100%;
            }
            .page-transition-enter {
              opacity: 0;
            }
            .page-transition-enter-active {
              opacity: 1;
              transition: opacity 200ms;
            }
            .page-transition-exit {
              opacity: 1;
            }
            .page-transition-exit-active {
              opacity: 0;
              transition: opacity 200ms;
            }
          `}</style>
        </>
      </AudioContext.Provider>
    )
  }
}

export default YTApp

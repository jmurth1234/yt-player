import React from 'react'
import { Video } from './youtube-retriever'

export interface YTAudioContext {
  nowPlaying?: Video
  isPlaying: boolean
  volume: number
  currentTime: number
  currentBuffered: number
  minimalUI: boolean
  loading: boolean
  setPosition: (pos: number) => void
  setNowPlaying: (nowPlaying: any) => void
  setVolume: (vol: number) => void
  togglePlaying: () => void
  setMinimalUI: (minimalUI: boolean) => void
}

export const AudioContext = React.createContext<YTAudioContext>({
  nowPlaying: null,
  isPlaying: false,
  volume: 1,
  currentTime: 0,
  currentBuffered: 0,
  minimalUI: false,
  loading: false,
  setPosition(pos) { },
  setNowPlaying(nowPlaying) { },
  setVolume(vol) { },
  togglePlaying() { },
  setMinimalUI(minimalUI) { },
})

export default class YTAudioContextWrapper extends React.Component<{ children: any }> {
  state = {
    nowPlaying: null,
    playing: false,
    volume: 1,
    currentTime: 0,
    currentBuffered: 0,
    minimalUI: false,
    loading: false,
  }

  audio = React.createRef<HTMLAudioElement>()

  setNowPlaying = (nowPlaying: any) => {
    this.setState({ nowPlaying })
  }

  setPlaying = (playing) => this.setState({ playing })
  setVolume = () => this.setState({ volume: this.audio.current.volume })
  setCurrentTime = () => {
    this.setState({
      currentTime: this.audio.current.currentTime,
      currentBuffered: this.audio.current.buffered.length
        ? this.audio.current.buffered.end(0)
        : 0,
    })
  }


  render() {
    const audioContext: YTAudioContext = {
      nowPlaying: this.state.nowPlaying,
      isPlaying: this.state.playing,
      volume: this.state.volume,
      currentTime: this.state.currentTime,
      currentBuffered: this.state.currentBuffered,
      minimalUI: this.state.minimalUI,
      loading: this.state.loading,

      setNowPlaying: this.setNowPlaying,
      setVolume: (vol: number) => {
        this.audio.current.volume = vol
      },
      setPosition: (pos: number) => {
        if (!this.audio.current) return
        this.audio.current.currentTime = pos
      },
      togglePlaying: () => {
        if (this.state.playing) {
          this.audio.current.pause()
        } else {
          this.audio.current.play()
        }
      },
      setMinimalUI: (minimalUI: boolean) => {
        this.setState({ minimalUI })
      }
    }

    return (
      <AudioContext.Provider value={audioContext}>
        <>
          {this.props.children}
          <audio
            id="audioElem"
            autoPlay
            src={audioContext.nowPlaying?.url}
            ref={this.audio}
            onPlaying={() => this.setPlaying(true)}
            onPause={() => this.setPlaying(false)}
            onVolumeChange={() => this.setVolume()}
            onTimeUpdate={() => this.setCurrentTime()}
            onLoadStart={() => this.setState({ loading: true })}
            onLoadedData={() => this.setState({ loading: false })}
            preload="all"
          >
            Your browser does not support the audio tag.
          </audio>
        </>
      </AudioContext.Provider>
    )
  }
}

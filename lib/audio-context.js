import React from 'react'

export default React.createContext({
  nowPlaying: {},
  isPlaying: false,
  volume: 1,
  currentTime: 0,
  currentBuffered: 0,
  setPosition() {},
  setNowPlaying() {},
  setVolume() {},
  togglePlaying() {}
})

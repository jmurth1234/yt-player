import React from 'react'

export default React.createContext({
  nowPlaying: {},
  isPlaying: false,
  volume: 1,
  setNowPlaying() {},
  setVolume() {},
  togglePlaying() {}
})

import React from 'react'

export default React.createContext({
  nowPlaying: {},
  isPlaying: false,
  setNowPlaying() {},
  setVolume() {},
  togglePlaying() {}
})

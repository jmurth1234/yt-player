import React from 'react'

export default React.createContext({
  nowPlaying: { url: '', id: null },
  isPlaying: false,
  volume: 1,
  currentTime: 0,
  currentBuffered: 0,
  setPosition(pos: number) {},
  setNowPlaying(nowPlaying: any) {},
  setVolume(vol: number) {},
  togglePlaying() {}
})

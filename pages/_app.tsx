import React from 'react'
import Nav from '../components/nav'
import Player from '../components/player'

import 'rc-slider/assets/index.css'
import '../styles/global.scss'

import { AppProps } from 'next/app'
import YTAudioContextWrapper from '../lib/audio-context'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const YTApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps, router } = props
  const hidden = router.pathname.includes('player')

  return (
    <YTAudioContextWrapper>
      <Nav hidden={hidden} />
      <div className="full-height">
        <Component {...pageProps} key={router.route} />
      </div>
      <Player hidden={hidden} />
    </YTAudioContextWrapper>
  )
}

export default YTApp

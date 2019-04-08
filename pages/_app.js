import React from 'react'
import App, { Container } from 'next/app'
import Nav from '../components/nav'
import AudioContext from '../lib/audio-context'
import Player from '../components/player'

class YTApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  state = { url: null }

  setAudioUrl = (url) => this.setState({ url })

  render() {
    const { Component, pageProps } = this.props
    const audioContext = { url: this.state.url, setAudioUrl: this.setAudioUrl }

    return (
      <AudioContext.Provider value={audioContext}>
        <Container>
          <Nav />
          <Component {...pageProps} />
          <Player />
        </Container>
      </AudioContext.Provider>
    )
  }
}

export default YTApp

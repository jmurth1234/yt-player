import React from 'react'

import Head from '../components/head'
import styles from '../styles/Page.module.scss'
import YoutubeForm from '../components/youtube-form'

const Home = () => (
  <div className={styles.page}>
    <Head title="Home" />

    <div className={styles.hero}>
      <h1 className={styles.title}>Welcome to YT Player</h1>
      <p className={styles.description}>
        Play most YouTube videos, without the video
      </p>
    </div>

    <YoutubeForm />
  </div>
)

export default Home

import React from 'react'
import Head from '../components/head'
import styles from '../styles/Page.module.scss'

const Home = () => (
  <div className={styles.page}>
    <Head title="About" />

    <div className={styles.hero}>
      <h1 className={styles.title}>About YT Player</h1>
    </div>

    <div className="row">
      <p>
        YT Player is a web app which allows you to play your favourite youtube
        based songs as audio, saving you bandwidth
      </p>
    </div>
  </div>
)

export default Home

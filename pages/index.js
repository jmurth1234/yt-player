import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import home from '../styles/home'
import YoutubeForm from '../components/youtube-form'

const Home = () => (
  <div className='page'>
    <Head title="Home" />

    <div className="hero">
      <h1 className="title">Welcome to YT Player</h1>
      <p className="description">
        Play most YouTube videos, without the video
      </p>
    </div>

    <YoutubeForm />

    <style jsx>{home}</style>
  </div>
)

export default Home

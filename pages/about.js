import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import home from '../styles/home'
import { row } from '../styles/shared'

const Home = () => (
  <div>
    <Head title="About" />
    <Nav />

    <div className="hero">
      <h1 className="title">About YT Player</h1>
    </div>

    <div className='row'>
      <p>
        YT Player is a web app which allows you to play your favourite youtube based songs as audio, saving you bandwidth 
      </p>
    </div>

    <style jsx>{home}</style>
    <style jsx>{row}</style>
  </div>
)

export default Home

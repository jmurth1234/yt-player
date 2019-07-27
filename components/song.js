import React from 'react'
import audioStyle from '../styles/mini-player'
import Link from 'next/link'

const Song = ({ video, replace }) => (
  <Link
    href={replace ? `/player?v=${video.id}` : '/player'}
    as={`/player?v=${video.id}`}
    replace={replace}
  >
    <a className="song">
      <img src={video.thumb} />
      <div className="cardInfo">
        <p className="cardTitle">{video.title}</p>
        <p>{video.channelName}</p>
      </div>
      <style jsx>{audioStyle}</style>
    </a>
  </Link>
)

export default Song

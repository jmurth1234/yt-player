import React from 'react'
import audioStyle from '../styles/mini-player'
import Link from 'next/link'

const Song = ({ video, replace, onClick }) => {
  const link = (
    <a className="song">
      <div className="inner">
        <img src={video.thumb} />
      </div>
      <div className="cardInfo">
        <p className="cardTitle">{video.title}</p>
        <p>{video.channelName}</p>
      </div>
      <style jsx>{audioStyle}</style>
    </a>
  )

  if (onClick) {
    return (
      <div onClick={onClick}>
        {link}
      </div>
    )
  }

  return (
    <Link href={`/player?v=${video.id}`} replace={replace}>
      {link}
    </Link>
  )
}
export default Song

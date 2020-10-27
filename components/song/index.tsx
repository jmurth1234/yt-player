import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from './Song.module.scss'

interface Props {
  video: any
  replace?: boolean
  onClick?: (event: any) => void
}

const Song = ({ video, replace, onClick }: Props) => {
  const link = (
    <a className={styles.song}>
      <div className={styles.inner}>
        {video.thumb && (
          <Image height={72} width={128} src={video.thumb} loading="eager" />
        )}
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.cardTitle}>{video.title}</p>
        <p>{video.channelName}</p>
      </div>
    </a>
  )

  if (onClick) {
    return <div onClick={onClick}>{link}</div>
  }

  return (
    <Link href={`/player/${video.id}`} replace={replace}>
      {link}
    </Link>
  )
}
export default Song

import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import styles from './Song.module.scss'
import { Video } from '../../lib/youtube-retriever'

const HashImage = dynamic(() =>
  import('../../components/blurhash').then((c) => c.HashImage)
)

interface Props {
  video: Video
  replace?: boolean
  onClick?: (event: any) => void
}

const Song = ({ video, replace, onClick }: Props) => {
  const link = (
    <a className={styles.song}>
      <div className={styles.inner}>
        {video.thumb && (
          <HashImage height={72} width={128} src={video.thumb} hash={video.blurHash} />
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

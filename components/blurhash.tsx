import React from 'react'

import Image from 'next/image'

import { decode as decodeBlurhash } from 'blurhash'
import { encode as encodePNG } from 'upng-js'
import { encode as encode64 } from 'base64-arraybuffer'

const hashToImage = (hash) => {
  if (!hash) return ''
  const pixels = decodeBlurhash(hash, 16, 10)
  const png = encodePNG([pixels], 16, 10, 256)
  const imageSrc = 'data:image/png;base64,' + encode64(png)

  return imageSrc
}

interface Props {
  hash: string
  src?: string
  height?: number
  width?: number
}

export const BlurredBackground: React.FC<Props> = ({ hash }) => (
  <style jsx global>{`
    body:before {
      content: '';
      position: fixed;
      z-index: -1;

      display: block;
      background-color: #aaaaaa;
      background-image: url('${hashToImage(hash)}');
      background-size: cover;
      background-position: center;
      height: 100%;
      width: 100%;
    }
  `}</style>
)

export const HashImage: React.FC<Props> = ({ hash, src, width, height }) => (
  <div>
    <Image width={width} height={height} src={src} loading="eager" />
    <style jsx>{`
      div {
        background-image: url('${hashToImage(hash)}');
        background-size: cover;
        background-position: center;
        height: 100vh;
        width: 100vh;
        max-width: ${width}px;
        max-height: ${height}px;
      }
    `}</style>
  </div>
)

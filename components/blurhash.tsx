import React from 'react'

import Image from 'next/image'

import { decode as decodeBlurhash } from 'blurhash'
import { encode as encodePNG } from 'upng-js'
import { encode as encode64 } from 'base64-arraybuffer'

const hashToImage = (hash) => {
  if (!hash) return ''
  const pixels = decodeBlurhash(hash, 16, 10)

  let img = ''

  if (process.browser) {
    const canvas = document.createElement('canvas')
    canvas.width = 16
    canvas.height = 10

    const ctx = canvas.getContext('2d')

    const imageData = ctx.createImageData(16, 10)
    imageData.data.set(pixels)
    ctx.putImageData(imageData, 0, 0)

    img = canvas.toDataURL()
  } else {
    const png = encodePNG([pixels], 16, 10, 256)
    img = 'data:image/png;base64,' + encode64(png)
  }

  return img
}

interface Props {
  hash: string
  src?: string
  height?: number
  width?: number
  eager?: boolean
  waveOnly?: boolean
}

export const BlurredBackground: React.FC<Props> = ({ hash, waveOnly }) => (
  <style jsx>{`
    body:before {
      content: '';
      position: fixed;
      z-index: -1;

      display: block;
      background-color: #aaaaaa;
      background-image: url('${hashToImage(hash)}');
      background-size: cover;
      background-position: center;
      ${waveOnly ? 'filter: grayscale(0.5) opacity(0.8);' : ''}
      height: 100%;
      width: 100%;
    }
  `}</style>
)

export const HashImage: React.FC<Props> = ({
  hash,
  src,
  width,
  height,
  eager
}) => (
  <div>
    <Image
      width={width}
      height={height}
      src={src}
      loading={eager ? 'eager' : 'lazy'}
    />
    <style jsx>{`
      div {
        display: flex;
        background-image: url('${hashToImage(hash)}');
        background-size: cover;
        background-position: center;
        width: 100vw;
        max-width: ${width}px;
        max-height: ${height}px;
        align-items: center;
        justify-content: center;
      }
    `}</style>
  </div>
)

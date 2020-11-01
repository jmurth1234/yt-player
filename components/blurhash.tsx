import React, { memo } from 'react'

import Image from 'next/image'

import { decode as decodeBlurhash } from 'blurhash'
import { encode as encodePNG } from 'upng-js'
import { encode as encode64 } from 'base64-arraybuffer'

const hashToImage = (hash) => {
  if (!hash) return ''
  console.time('hash')
  const pixels = decodeBlurhash(hash, 16, 10)
  console.timeLog('hash', 'decode hash')

  let img = ''

  if (process.browser) {
    const canvas = document.createElement("canvas");
    canvas.width = 16
    canvas.height = 10

    const ctx = canvas.getContext("2d");

    const imageData = ctx.createImageData(16, 10);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);

    img = canvas.toDataURL()
  } else {
    const png = encodePNG([pixels], 16, 10, 256)
    img = 'data:image/png;base64,' + encode64(png)
  }

  console.timeLog('hash', 'into image')

  console.timeEnd('hash')

  return img
}

interface Props {
  hash: string
  src?: string
  height?: number
  width?: number
}

export const BlurredBackground: React.FC<Props> = memo(({ hash }) => (
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
))

export const HashImage: React.FC<Props> = memo(({ hash, src, width, height }) => (
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
))

import { encode } from 'blurhash'
import sharp from 'sharp'
import { extractColors } from 'extract-colors'
import fetch from 'node-fetch'

interface BufferReturn {
  height: number
  width: number
  buffer: Buffer
}

async function getBuffer(url: string, isRaw?: boolean): Promise<BufferReturn> {
  const image = await fetch(url)

  return new Promise((resolve, reject) => {
    let process = sharp()
      .ensureAlpha()
      .resize(128, 72, { fit: 'inside' })

    image.body.pipe(process)

    if (isRaw) {
      process = process.raw()
    } else {
      process = process.jpeg()
    }

    process.toBuffer((err, buffer, { width, height }) => {
      if (err) return reject(err)

      resolve({ buffer, width, height })
    })
  })
}

export async function encodeImageToBlurHash(url: string): Promise<string> {
  const { buffer, height, width } = await getBuffer(url, true)

  return encode(new Uint8ClampedArray(buffer), width, height, 8, 5)
}

export async function encodeImageToColours(url: string): Promise<string[]> {
  const { buffer } = await getBuffer(url)

  try {
    const colours = await extractColors(buffer)

    return colours.map(colour => colour.hex)
  } catch (e) {
    console.error(e)
  }
  return []
}
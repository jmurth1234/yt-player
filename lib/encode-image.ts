import { encode } from 'blurhash'
import sharp from 'sharp'

export async function encodeImageToBlurHash(url: string): Promise<string> {
  const image: any = await fetch(url)
  const buffer = await image.buffer()

  return new Promise((resolve, reject) => {
    sharp(buffer)
      .raw()
      .ensureAlpha()
      .resize(128, 72, { fit: 'inside' })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err)
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 8, 5))
      })
  })
}

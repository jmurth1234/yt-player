import { encode } from 'blurhash';
import sharp from 'sharp';

export function encodeImageToBlurhash(url: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const image: any = await fetch(url);
    const buffer = await image.buffer();
    sharp(buffer)
      .raw()
      .ensureAlpha()
      .resize(128, 72, { fit: 'inside' })
      .toBuffer((err, buffer, { width, height }) => {
        if (err)
          return reject(err);
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 8, 5));
      });
  });
}

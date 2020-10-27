import { decode as decodeBlurhash } from 'blurhash'
import { encode as encodePNG } from 'upng-js'
import { encode as encode64 } from 'base64-arraybuffer'

const hashToImage = (hash) => {
  if (!hash) return ''
  const pixels = decodeBlurhash(hash, 16, 9)
  const png = encodePNG([pixels], 16, 9, 256)
  const imageSrc = 'data:image/png;base64,' + encode64(png)

  return imageSrc
}

const BlurredBackground = ({ hash }) => (
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

export default BlurredBackground

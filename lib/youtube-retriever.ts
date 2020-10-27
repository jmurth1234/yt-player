import ytdl from 'ytdl-core'
import { encode } from 'blurhash'
import sharp from 'sharp'

const encodeImageToBlurhash = (url) =>
  new Promise(async (resolve, reject) => {
    const image: any = await fetch(url)
    const buffer = await image.buffer()
    sharp(buffer)
      .raw()
      .ensureAlpha()
      .resize(128, 72, { fit: 'inside' })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err)
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 8, 5))
      })
  })

export const getYoutube = async (url, stream) => {
  if (!url) {
    throw new Error('URL is required')
  }

  interface Related extends ytdl.relatedVideo {
    video_thumbnail?: string
  }

  if (stream) {
    const youtube = ytdl(url, { quality: 'highestaudio' })
    return youtube
  } else {
    const videoInfo = await ytdl.getInfo(url)
    const playerResponse = videoInfo.player_response
    const largeThumb = playerResponse.videoDetails.thumbnail.thumbnails.pop()

    const info = videoInfo.videoDetails

    const blurHash = await encodeImageToBlurhash(largeThumb.url)

    const infoObj = {
      title: info.title.trim(),
      channelName: info.author.name,
      channelUrl: info.author.channel_url,
      thumb: largeThumb.url,
      blurHash,
      id: info.videoId,
      length: Number.parseInt(info.lengthSeconds),
      related: videoInfo.related_videos
        .filter((video) => !!video.title && !!video.id)
        .map((video: Related) => ({
          title: video.title,
          thumb: video.video_thumbnail,
          channelName: video.author,
          id: video.id,
        })),
    }

    return infoObj
  }
}

export const getFromRequest = async (req, res, stream) => {
  const url = req.body.url || `https://youtube.com/watch?v=${req.query.id}`
  let youtube
  try {
    youtube = await getYoutube(url, stream)
  } catch (e) {
    res.status('404').send({ error: `Could not stream: ${e}` })
  }

  return youtube
}

export const getInfo = async (req, res) => {
  const info = await getFromRequest(req, res, false)
  if (!info) return

  res.setHeader('Cache-Control', 's-maxage=0, stale-while-revalidate')
  res.send(info)
}

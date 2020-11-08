import ytdl from 'ytdl-core'
import { Readable, PassThrough } from 'stream'

import { encodeImageToBlurHash } from './encode-image'
import ffmpeg, { setFfmpegPath } from 'fluent-ffmpeg'
import path from 'ffmpeg-static'
import delay from 'delay-stream'

setFfmpegPath(path)

export interface Video {
  id: string
  title: string
  channelName: string
  thumb: string
  blurHash: string
  url?: string
  channelUrl?: string
  length?: number
  related?: Video[]
}

export const getYoutube = async (
  url: string,
  stream: boolean
): Promise<Video | Readable> => {
  if (!url) {
    throw new Error('URL is required')
  }

  interface Related extends ytdl.relatedVideo {
    video_thumbnail?: string
  }

  if (stream) {
    const youtube = ytdl(url, {
      quality: 'highestaudio',
      highWaterMark: 1 << 25,
    })
    return youtube
  } else {
    const videoInfo = await ytdl.getInfo(url)
    const playerResponse = videoInfo.player_response
    const largeThumb = playerResponse.videoDetails.thumbnail.thumbnails.pop()

    const info = videoInfo.videoDetails

    const blurHash = await encodeImageToBlurHash(largeThumb.url)

    const related = await Promise.all(
      videoInfo.related_videos
        .filter((video) => !!video.title && !!video.id)
        .map(
          async (video: Related): Promise<Video> => {
            const blurHash = await encodeImageToBlurHash(video.video_thumbnail)

            return {
              title: video.title,
              thumb: video.video_thumbnail,
              channelName: video.author,
              id: video.id,
              blurHash,
            }
          }
        )
    )

    const infoObj: Video = {
      title: info.title.trim(),
      channelName: info.author.name,
      channelUrl: info.author.channel_url,
      thumb: largeThumb.url,
      blurHash,
      id: info.videoId,
      length: Number.parseInt(info.lengthSeconds),
      related,
    }

    return infoObj
  }
}

export const getFromRequest = async (req, res, stream) => {
  const url = req.body.url || `https://youtube.com/watch?v=${req.query.id}`
  let youtube: Video | Readable = null
  try {
    youtube = await getYoutube(url, stream)
  } catch (e) {
    res.status('404').send({ error: `Could not stream: ${e}` })
  }

  if (stream) {
    const input = youtube as Readable
    const stream = new PassThrough()
    const ff = ffmpeg()
      .noVideo()
      .format('mp3')
      .audioBitrate('128')
      .on('end', () => {
        console.log('Successfully converted file')
      })
      .on('error', (err) => {
        console.log(err)
      })

    ff.input(input)

    ff.pipe(delay(5000)).pipe(stream)

    return stream
  }

  return youtube
}

export const getInfo = async (req, res) => {
  const info = await getFromRequest(req, res, false)
  if (!info) return

  res.setHeader('Cache-Control', 's-maxage=0, stale-while-revalidate')
  res.send(info)
}

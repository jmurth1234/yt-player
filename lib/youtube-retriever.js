import ffmpeg, { setFfmpegPath } from 'fluent-ffmpeg'
import { path } from 'ffmpeg-static'

setFfmpegPath(path)

import ytdl from 'ytdl-core'

const getVideo = stream => (req, res) => {
  const url = req.body.url || `https://youtube.com/watch?v=${req.query.id}`

  if (!url) {
    return res.status('400').send({ error: 'Please send a youtube url' })
  }

  try {
    const youtube = ytdl(url)
    youtube.on('info', info => {
      const largeThumb = info.player_response.videoDetails.thumbnail.thumbnails.pop()
      const videoInfo = {
        title: info.title.trim(),
        channelName: info.author.name,
        channelUrl: info.author.channel_url,
        thumb: largeThumb.url,
        id: info.player_response.videoDetails.videoId,
        length: Number.parseInt(info.length_seconds),
        related: info.related_videos
          .filter(video => !!video.title && !!video.id)
          .map(video => ({
            title: video.title,
            thumb: video.iurlhq,
            channelName: video.author,
            id: video.id
          }))
      }

      if (!stream) {
        res.send(videoInfo)
      }
    })

    if (stream) {
      ffmpeg(youtube)
        .noVideo()
        .format('mp3')
        .on('end', () => {
          console.log('Successfully converted file')
        })
        .on('error', err => {
          console.log('Error: ' + err.message)
          console.log(err)
        })
        .pipe(res)
    }
  } catch (e) {
    res.status('503').send({ error: `Error when streaming: ${e}` })
  }
}

export default getVideo

const express = require('express')
const body = require('body-parser')

const router = express.Router()
const ffmpeg = require('fluent-ffmpeg')
const ffmpegBinary = require('ffmpeg-static')
const morgan = require('morgan')

ffmpeg.setFfmpegPath(ffmpegBinary.path)

const ytdl = require('ytdl-core')

module.exports = () => {
  router.use(body.json())
  router.use(morgan('combined'))
  router.get('/', (req, res) => {
    res.send('welcome to the yt-player api')
  })

  const getVideo = stream => (req, res) => {
    const url = req.body.url || `https://youtube.com/watch?v=${req.params.id}`
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
          thumb: info.thumbnail_url,
          largeThumb: largeThumb.url,
          id: info.video_id,
          length: Number.parseInt(info.length_seconds)
        }
        if (!stream) {
          res.send(videoInfo)
        }
      })

      if (stream) {
        res.set({
          'Content-Type': 'audio/mpeg'
        })
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

  router.get('/stream-youtube/:id', getVideo(true))
  router.post('/info', getVideo())
  router.post('/info/:id', getVideo())

  return router
}

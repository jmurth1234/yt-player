const express = require('express')
const morgan = require('morgan')
const body = require('body-parser')

const router = express.Router()
const ffmpeg = require('./ffmpeg')

const ytdl = require('ytdl-core')

router.use(morgan('combined'))
router.use(body.json())

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
      const videoInfo = {
        title: info.title,
        channelName: info.author.name,
        channelUrl: info.author.channel_url,
        thumb: info.thumbnail_url,
        id: info.video_id
      }
      if (stream) {
        const context = ffmpeg('-i pipe:0 -f mov -vn -ar 44100 -ac 2 -b:a 128k -f mp3 -'.split(' '))
        youtube.pipe(context.stdin)
        context.stdout.pipe(res, { end: true })
        context.stderr.pipe(process.stdout)
      } else {
        res.send(videoInfo)
      }
    })
  } catch (e) {
    res.status('503').send({ error: `Error when streaming: ${e}` })
  }
}

router.get('/stream-youtube/:id', getVideo(true))
router.post('/info', getVideo())

module.exports = router
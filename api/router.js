const express = require('express')
const morgan = require('morgan')
const body = require('body-parser')

const router = express.Router()
const ffmpeg = require('fluent-ffmpeg')
const ffmpegBinary = require('ffmpeg-static')
const temp = require("temp").track()
const fs = require("fs")

ffmpeg.setFfmpegPath(ffmpegBinary.path)

const ytdl = require('ytdl-core')

router.use(morgan('combined'))
router.use(body.json())

router.get('/', (req, res) => {
  res.send('welcome to the yt-player api')
})

const streamFile = (req, res, file) => {
  const stat = fs.statSync(file)
  const range = req.headers.range

  let readStream
  if (range !== undefined) {
    const parts = range.replace(/bytes=/, '').split('-')

    const partialStart = parts[0]
    const partialEnd = parts[1]

    const start = parseInt(partialStart, 10)
    const end = partialEnd ? parseInt(partialEnd, 10) : stat.size - 1
    const contentLength = (end - start) + 1

    res.status(206).header({
      'Content-Type': 'audio/mpeg',
      'Content-Length': contentLength,
      'Content-Range': 'bytes ' + start + '-' + end + '/' + stat.size
    })

    readStream = fs.createReadStream(file, { start: start, end: end })
  } else {
    res.header({
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size
    })
    readStream = fs.createReadStream(file)
  }

  readStream.pipe(res)
}

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
        res.writeHead(200, {
          'Transfer-Encoding': 'chunked',
          'Cache-Control': "no-cache",
          'Connection': 'Keep-Alive'
        });

        const tempFile = temp.createWriteStream()
        ffmpeg(youtube)
          .noVideo()
          .format("mp3")
          .on('end', () => {
            console.log('Successfully converted file')
            streamFile(req, res, tempFile.path)
          })
          .on('error', (err) => {
            console.log('Error: ' + err.message)
            console.log(err)
          })
          .output(tempFile)
          .run()
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
import { getFromRequest } from '../../../lib/youtube-retriever'
import ffmpeg, { setFfmpegPath } from 'fluent-ffmpeg'
import path from 'ffmpeg-static'
setFfmpegPath(path)

export default async (req, res) => {
  const youtube = await getFromRequest(req, res, true)

  if (!youtube) return
  res.setHeader('Cache-Control', 's-maxage=0, stale-while-revalidate')
  try {
    ffmpeg(youtube)
      .noVideo()
      .format('mp3')
      .audioBitrate('128')
      .on('end', () => {
        console.log('Successfully converted file')
      })
      .on('error', err => {
        console.log('Error: ' + err.message)
        console.log(err)
      })
      .pipe(res)
  } catch (e) {
    res.status('503').send({ error: `Error when streaming: ${e}` })
  }
}

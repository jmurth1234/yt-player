import { getFromRequest } from '../../../lib/youtube-retriever'
import delay from 'delay-stream'
import { Throttle } from 'stream-throttle'

export default async (req, res) => {
  const youtube = await getFromRequest(req, res, true)

  if (!youtube) return
  res.setHeader('Cache-Control', 's-maxage=0, stale-while-revalidate')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Disposition', 'attachment')

  try {
    youtube
      .pipe(new Throttle({ rate: 16384 }))
      .pipe(delay(2000))
      .pipe(res, { end: true })

  } catch (e) {
    console.log(e)
    res.status('503').send({ error: `Error when streaming: ${e}` })
  }
}

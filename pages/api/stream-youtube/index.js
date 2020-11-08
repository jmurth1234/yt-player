import { getFromRequest } from '../../../lib/youtube-retriever'
import delay from 'delay-stream'

export default async (req, res) => {
  const youtube = await getFromRequest(req, res, true)

  if (!youtube) return
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    youtube
      .pipe(delay(5000))
      .pipe(res)
  } catch (e) {
    console.log(e)
    res.status('503').send({ error: `Error when streaming: ${e}` })
  }
}

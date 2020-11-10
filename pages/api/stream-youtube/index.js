import { getFromRequest } from '../../../lib/youtube-retriever'

export default async (req, res) => {
  const youtube = await getFromRequest(req, res, true)

  if (!youtube) return
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    youtube
      .pipe(res)
  } catch (e) {
    console.log(e)
    res.status('503').send({ error: `Error when streaming: ${e}` })
  }
}

import { getFromRequest } from '../../../lib/youtube-retriever'

export default async (req, res) => {
  const youtube = await getFromRequest(req, res, true)

  if (!youtube) return
  res.setHeader('Cache-Control', 's-maxage=0, stale-while-revalidate')
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Content-Disposition', 'attachment')

  try {
    youtube.pipe(res, { end: true })
  } catch (e) {
    res.status('503').send({ error: `Error when streaming: ${e}` })
  }
}

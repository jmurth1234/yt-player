import { NextApiHandler } from 'next'
import { Readable } from 'stream'
import { getFromRequest } from '../../../lib/youtube-retriever'

const streamYoutube: NextApiHandler = async (req, res) => {
  const youtube = await getFromRequest(req, res, true) as Readable

  if (!youtube) return
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    res.setHeader('Content-Type', 'audio/mpeg')
    
    youtube.pipe(res)
  } catch (e) {
    console.log(e)
    res.status(503).send({ error: `Error when streaming: ${e}` })
  }
}

export default streamYoutube

export const config = {
  api: {
    responseLimit: false,
  },
}
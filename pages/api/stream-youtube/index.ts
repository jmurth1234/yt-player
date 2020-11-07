import { getFromRequest } from '../../../lib/youtube-retriever'
import { Request, Response } from 'express'
import { PassThrough } from 'stream'

import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'

export default async (req: Request, res: Response) => {
  const youtube: PassThrough = (await getFromRequest(
    req,
    res,
    true
  )) as PassThrough

  fs.readdir('/tmp/', function (err, files) {
    files.forEach(function (file, index) {
      fs.stat(path.join('/tmp/', file), function (err, stat) {
        var endTime, now
        if (err) {
          return console.error(err)
        }
        now = new Date().getTime()
        endTime = new Date(stat.ctime).getTime() + 3600000
        if (now > endTime && file !== req.query.id) {
          return rimraf(path.join('/tmp/', file), function (err) {
            if (err) {
              return console.error(err)
            }
            console.log('successfully deleted')
          })
        }
      })
    })
  })

  if (!youtube) return
  const file = `/tmp/${req.query.id}`
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (!fs.existsSync(file)) {
    const stream = fs.createWriteStream(file)
    youtube.pipe(stream)
    await new Promise((resolve) => {
      stream.on('end', () => {
        resolve()
      })
    })
  }

  try {
    res.sendFile(file)
  } catch (e) {
    console.log(e)
    res.status(503).send({ error: `Error when streaming: ${e}` })
  }
}

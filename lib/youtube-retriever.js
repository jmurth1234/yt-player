import ytdl from 'ytdl-core'

export const getYoutube = (url, stream) =>
  new Promise((resolve, reject) => {
    if (!url) {
      return reject(new Error('URL is required'))
    }

    const youtube = ytdl(url)
    youtube.on('info', info => {
      const largeThumb = info.player_response.videoDetails.thumbnail.thumbnails.pop()
      const videoInfo = {
        title: info.title.trim(),
        channelName: info.author.name,
        channelUrl: info.author.channel_url,
        thumb: largeThumb.url,
        id: info.player_response.videoDetails.videoId,
        length: Number.parseInt(info.length_seconds),
        related: info.related_videos
          .filter(video => !!video.title && !!video.id)
          .map(video => ({
            title: video.title,
            thumb: video.iurlhq,
            channelName: video.author,
            id: video.id
          }))
      }

      if (!stream) {
        return resolve(videoInfo)
      }
    })

    if (stream) resolve(youtube)
  })

export const getFromRequest = async (req, res, stream) => {
  const url = req.body.url || `https://youtube.com/watch?v=${req.query.id}`
  let youtube
  try {
    youtube = await getYoutube(url, stream)
  } catch (e) {
    res.status('404').send({ error: `Could not stream: ${e}` })
  }

  return youtube
}

export const getInfo = async (req, res) => {
  const info = await getFromRequest(req, res, false)
  if (!info) return

  res.setHeader('Cache-Control', 's-maxage=0, stale-while-revalidate')
  res.send(info)
}

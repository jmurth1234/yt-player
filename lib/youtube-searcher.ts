import search from 'yt-search'

export async function searchYoutube(query: string) {
  let youtube = await search(query)
  const items = youtube.videos
    .map((video) => ({
      id: video.videoId,
      thumb: video.thumbnail,
      title: video.title,
      channelName: video.author.name,
    }))

  return items
}

export async function getFromRequest(req, res) {
  const search = req.body.search
  let youtube
  try {
    youtube = await searchYoutube(search)
  } catch (e) {
    console.error(e)
    res.status('404').send({ error: `Could not search: ${e}` })
  }

  return youtube
}

export async function searchRequest(req, res) {
  const info = await getFromRequest(req, res)
  if (!info) return

  res.setHeader('Cache-Control', 's-maxage=0, stale-while-revalidate')
  res.send(info)
}

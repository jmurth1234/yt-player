import { Video } from "./youtube-retriever"

export default function getAudioUrl(data: Video) {
  if (!data) return ''
  if (data.id === '') return ''
  const url = process.env.IS_NOW ? 'https://yt-player-app.herokuapp.com' : ''

  return `${url}/api/stream-youtube?id=${data.id}`
}

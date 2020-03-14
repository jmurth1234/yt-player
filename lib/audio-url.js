export default function getAudioUrl(data) {
  if (!data) return ''
  const url = process.env.IS_NOW ? 'https://yt-player-app.herokuapp.com' : ''

  return `${url}/api/stream-youtube?id=${data.id}`
}

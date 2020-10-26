import { getYoutube } from '../../lib/youtube-retriever'
import Player from './index'

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params, res } = context
  const id = params && params.id

  if (res && !id) {
    res.writeHead(302, {
      Location: '/',
    })
    res.end()
  }

  if (!id) {
    return {}
  }

  const url = `https://youtube.com/watch?v=${id}`
  const result = await getYoutube(url)

  return { props: { result }, revalidate: 600 }
}

export default Player

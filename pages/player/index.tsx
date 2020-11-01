import Router, { useRouter } from 'next/router'

export async function getServerSideProps(context) {
  const { query, res } = context
  const id = query && query.v

  if (res && !id) {
    res.writeHead(302, {
      Location: '/',
    })
    res.end()
  }

  if (!id) {
    return {}
  }

  if (res) {
    res.writeHead(302, {
      Location: `/player/${id}`,
    })
    res.end()
  } else {
    await Router.replace(`/player/${id}`)
  }

  return { props: { id } }
}

export default function redirect({ id }) {
  const router = useRouter()
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.replace(`/player/${id}`)
    return
  }
}

const cacheableResponse = require('cacheable-response')
const express = require('express')
const next = require('next')
const http = require('http')

const compression = require('compression')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res }) => {
    const rawResEnd = res.end
    const data = await new Promise((resolve) => {
      res.end = (payload) => {
        if (res.statusCode === 200) {
          resolve(payload)
        } else {
          resolve()
        }
      }
      app.render(req, res, req.path, {
        ...req.query,
        ...req.params,
      })
    })
    res.end = rawResEnd
    return { data }
  },
  send: ({ data, res }) => res.send(data),
})

app.prepare().then(() => {
  const server = express()
  server.use(compression())

  server.get('/', (req, res) => ssrCache({ req, res }))
  server.get('/about', (req, res) => ssrCache({ req, res }))

  server.get('/player/:id', (req, res) => {
    return ssrCache({ req, res })
  })

  server.get('*', (req, res) => handle(req, res))
  server.post('*', (req, res) => handle(req, res))

  const listener = http.createServer(server)

  listener.listen(port, (err) => {
    if (err) throw err
    listener.keepAliveTimeout = 1000 * 60 * 60
    console.log(`> Ready on http://localhost:${port}`)
  })
})

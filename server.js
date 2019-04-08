const next = require('next')
const express = require('express')
const { createServer } = require('http')
const compression = require('compression')
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()
  app.use(compression())
  const server = createServer(app)

  app.use('/api', require('./api/router')())

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, '0.0.0.0', err => {
    if (err) throw err
    console.log(`> Ready on :${port}`)
  })
})
const next = require('next')
const express = require('express')
const temp = require('temp').track()
const tempFolder = temp.mkdirSync()
const { createServer } = require('http')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()
  const server = createServer(app)

  app.use('/api', require('./api/router')(tempFolder))

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
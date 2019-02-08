import next from 'next'
import express from 'express'
import router from './router'

const port = parseInt((process as any).env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = router.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  server.route('*').get((req, res) => handle(req, res))

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})

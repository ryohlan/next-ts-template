import next from 'next'
import express from 'express'
import Pattern from './router/pattern.json'

const port = parseInt((process as any).env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  for (let { page, pattern } of Pattern.patterns) {
    server.get(pattern, (req, res) =>
      app.render(req, res, page, { ...req.query, ...req.params })
    )
  }
  server.route('*').get((req, res) => handle(req, res))

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})

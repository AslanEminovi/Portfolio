app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const host = req.headers.host

    // Redirect non-www to www
    if (host === 'aslaneminovi.com.tr') {
      res.writeHead(301, { Location: `http://www.aslaneminovi.com.tr${req.url}` })
      res.end()
      return
    }

    handle(req, res, parsedUrl)
  }).listen(port)

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})

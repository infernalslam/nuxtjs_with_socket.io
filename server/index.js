import express from 'express'
import { Nuxt, Builder } from 'nuxt'
// youtube lib
const YouTube = require('youtube-node')
const youTube = new YouTube()
youTube.setKey('AIzaSyDvwXUsN2hDGHCvrUeclxFFffgGLlGv8OE')
// get ip
const internalIp = require('internal-ip')

const app = express()
// bodyparser
// var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// socket.io
const http = require('http').Server(app)
// const server = require('http').createServer(app)
const io = require('socket.io')(http)

app.set('port', port)

// Import API Routes
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

// query data form youTube
app.get('/api/query', (req, res) => {
  youTube.search(req.query.query, 50, (err, result) => {
    if (err) res.status(500)
    else res.send(JSON.stringify(result, null, 2))
  })
})

// ip route
app.get(`/api/route`, (req, res) => {
  internalIp.v4().then(async (ip) => {
    res.send(ip)
  })
})

// socket.io route
io.on('connection', (socket) => {
  console.log('a user connected : ' + socket.id)
  socket.on('disconnect', () => {
    console.log('user disconnected : ' + socket.id)
  })
  socket.on('add-list', (res) => {
    socket.broadcast.emit('now-playlist', res)
  })
})

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
http.listen(3000, () => {
  console.log(`listening on ${host}:3000`)
})
// http.listen(port, host)
// console.log('Server listening on localhost:' + port)
// app.listen(port, host)
// console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console

import fs from 'fs'
import spdy from'spdy'
import http from 'http'
import https from 'https'
import { createServer } from 'http'
import app from './server'

//ssl credentials
const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpServer = http.createServer(app)
const httpsServer = spdy
    .createServer(credentials, app)
    .listen(3001, (error) => {
        if (error) {
            console.error(error)
            return process.exit(1)
        } else {
            console.log('Listening on port:3001 ')
        }
    })

let currentApp = app

httpServer.listen(3000, () => {
    console.log('Server listening on port 3000')
})

if (module.hot) {
    module.hot.accept(['./server'], () => {
        httpsServer.removeListener('request', currentApp)
        httpsServer.on('request', app)
        currentApp = app
    })
}

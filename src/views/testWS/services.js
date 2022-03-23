const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 9000 })

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`)
        console.log(`${message}`)
        ws.send(`${message} + 1`)
    })
})
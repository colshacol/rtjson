import * as WebSocket from 'ws'

export default class Socket {
  socket: any

  constructor(options) {
    const socket = new WebSocket.Server(options)

    socket.on('connection', this.onConnection)
    socket.on('listening', this.onListening)
    this.socket = socket
  }

  sendTo = (client, data) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data))
    }
  }

  broadcast = (data): void => {
    this.socket.clients.forEach((client) => {
      this.sendTo(client, data)
    })
  }

  onListening = () => {
    console.log('Socket listening.')
  }

  onConnection = (client) => {
    console.log('Got a connection.')
    client.on('message', this.onMessage)
  }

  onMessage = (data) => {
    console.log('Got a message', data)
  }
}

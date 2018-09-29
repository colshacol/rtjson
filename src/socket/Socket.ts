import WebSocket from 'ws'
import nanoid from 'nanoid'

import onMessage from './onMessage'

const collectionName = (data) => `${data.user}:${data.name}`

export default class Socket {
  socket: any

  subscriptions = new Map()
  associations = new Map()
  connections = new Set()

  constructor(options) {
    const socket = new WebSocket.Server(options)
    socket.on('connection', this.onConnection)
    socket.on('listening', this.onListening)
    this.socket = socket

    setInterval(() => {
      this.associations.forEach((client, uid) => {
        if (!this.connections.has(uid)) return client.terminate()
        this.connections.delete(uid)
        client.ping(() => {})
      })
    }, 10000)
  }

  sendTo = (client, data) => {
    client.send(JSON.stringify(data))
  }

  broadcast = (data): void => {
    const _collectionName = collectionName(data)

    if (this.subscriptions.has(_collectionName)) {
      const subs = this.subscriptions.get(_collectionName)
      console.log(`Broadcasting change to ${subs.size} subscribers.`)

      subs.forEach((client) => {
        this.sendTo(client, { messageType: 'update', ...data })
      })
    }
  }

  subscribe = (data: SubscriptionDataT) => {
    const client = this.associations.get(data.uid)
    const _collectionName = collectionName(data.subscribeTo)

    this.subscriptions.has(_collectionName)
      ? this.subscriptions.get(_collectionName).add(client)
      : this.subscriptions.set(_collectionName, new Set([client]))

    this.sendTo(client, { subscribed: true })
  }

  onListening = () => {
    console.log('WebSocket server listening.')
  }

  confirmConnection = (data) => () => {
    this.connections.add(data.uid)
  }

  onConnection = (client) => {
    console.log('Got a connection.')
    const data = { messageType: 'uid', uid: nanoid() }

    this.connections.add(data.uid)
    this.associations.set(data.uid, client)

    client.on('message', this.onMessage)
    client.on('pong', this.confirmConnection(data))

    this.sendTo(client, data)
  }

  onMessage = onMessage(this)
}

type SubscriptionDataT = {
  uid: string
  user: string
  name: string
}
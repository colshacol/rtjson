# rtjson

A very simple, realtime JSON WebSocket server.

## API Capabilities

### Socket

- Subscribe to a user/collection.
- Post new entries to a user/collection.

### REST

- Create an account.
- Create a collection.
- Apply permissions to a collection.
- Post new entries to a user/collection.

## Example client usage.

\_`rtjson` npm package does not yet exist! BEWARE

```js
import rt from 'rtjson'

class ServerLogs extends Rt.Subscription {
  state = {
    logs: [],
    connectionStatus: '',
    subscriptionStatus: ''
  }

  willConnect(data) {
    // Prescribe what you need to do prior to the socket
    // connecting to rtjson. This method is useful mainly
    // when you need to update the UI between the "connected"
    // and "subscribed" sttaes.

    this.setState({
      connectionStatus: 'connecting'
    })
  }

  async willSubscribe(data) {
    // Prescribe what you need to do prior to the socket
    // subscribing to to the collection, but after it has
    // already connected. An example may be fetching some
    // the last 50 messages to populate a chat room.

    const previousEntries = await rt.get({
      userName: this.config.userName,
      collectionName: this.config.collectionName,
      entryCount: 10
    })

    this.setState({
      logs: previousEntries
    })
  }

  didConnect(data) {
    // Prescribe what you need to do as soon as the socket
    // is connected. (May be deprecated in favor of just using
    // the socketWillSubscribe lifecycle method.)

    this.setState({
      connectionStatus: 'connected'
    })
  }

  shouldDisconnect(data) {
    // Sometimes, given the logic in your application, your socket
    // may try to disconnect when you do not mean for it to.
    // is a good time to make certain that this is what you want
    // and potentially block the attempt, if necessary.

    return doIWantItToDisconnect
      ? true
      : false
  }

  willDisconnect(data) {
    // We've determined that a disconnect is your intent.
    // So now, what would you like to do prior to disconnecting?

    this.setState({
      status: 'disconnecting'
    })
  }

  didDisconnect(data) {
    // After the socket has disconnected, whatchu wanna do?

    this.setState({
      status: 'disconnected'
    })
  }

  receivedMessage(message) {
    // Handle messages received from rtjson.
  }

  addLogToCollection = (type, messages) => {
    this.sendMessage({
      additions: [
        {
          type
          messages
        },
      ]
    })
  }

  update() {
    // Will be called after state updates. Allows you to
    // react to changes / updates after you have processed them
    // and reduced them to your state.
  }
}

const serverLogs = new ServerLogs({
  userName: 'amit-patel',
  collectionName: 'server-logs'
})

serverLogs.sendMessage('log', ['foo', 'bar', 'baz'])
```

import pify from 'pify'
import bodyJson from 'body/json'

const jsonBody = pify(bodyJson)

export default {
  method: 'post',
  match: '/createCollection',

  async handler(context) {
    try {
      const body = await jsonBody(context.request, context.response)
      console.log(`Creating user "${body.user}" collection "${body.name}".`)
      context.db.createCollection(body)
      context.send({ success: true })
    } catch (error) {
      console.error('/createCollection error: ', error)
    }
  },
}

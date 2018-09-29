import pify from 'pify'
import bodyJson from 'body/json'

const jsonBody = pify(bodyJson)

export default {
  method: 'post',
  match: '/updateCollection',

  async handler(context) {
    try {
      const body = await jsonBody(context.request, context.response)
      console.log(`Updating user "${body.user}" collection "${body.name}".`)
      context.db.updateCollection(body)
      context.send({ success: true })
    } catch (error) {
      console.error('/updateCollection error: ', error)
    }
  },
}

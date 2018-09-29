import fetch from '../fetch'

fetch('http://localhost:8090/')
  .body({ type: 'log', messages: ['a', 'b', 'c'] })
  .post()
  .json((a) => {
    console.log('success!', a)
  })

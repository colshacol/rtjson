import fetch from './fetch'

fetch('http://localhost:8090/addLog')
  .post({ type: 'log', messages: ['a', 'b', 'c'] })
  .json((a) => {
    console.log('success!', a)
  })

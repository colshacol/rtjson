import wretch from 'wretch'

export default ((): any => {
  wretch().polyfills({
    fetch: require('node-fetch'),
    FormData: require('form-data'),
    URLSearchParams: require('url').URLSearchParams,
  })

  return wretch
})()

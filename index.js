'use strict'

const fetch = require('node-fetch')

const baseUrl = 'https://api.debitoor.com/api'

module.exports = accessToken => (url, options = {}) => {
  const { headers = {} } = options
  headers['x-token'] = accessToken
  if (url.startsWith('/')) {
    url = baseUrl + url
  }
  return fetch(url, { ...options, headers })
}

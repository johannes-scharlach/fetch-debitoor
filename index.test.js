/* eslint-env jest */

const fetch = require('node-fetch')
const debitoorFactory = require('./index.js')

jest.mock('node-fetch', () => jest.fn(() => Promise.resolve('Some result')))

beforeEach(() => {
  fetch.mockClear()
})

describe('fetch-debitoor', () => {
  it('must set the `x-token` header if no options are passed', () => {
    expect.assertions(1)
    const debitoor = debitoorFactory('my-access-token')

    return debitoor('/v1/customers').then(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://api.debitoor.com/api/v1/customers',
        {
          headers: {
            'x-token': 'my-access-token',
          },
        }
      )
    })
  })

  it('must set the `x-token` header if other headers are passed', () => {
    expect.assertions(1)
    const debitoor = debitoorFactory('my-access-token')

    return debitoor('/v1/customers', {
      headers: {
        Accept: 'application/json',
      },
    }).then(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://api.debitoor.com/api/v1/customers',
        {
          headers: {
            'x-token': 'my-access-token',
            Accept: 'application/json',
          },
        }
      )
    })
  })
})

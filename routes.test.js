const request = require('supertest')
const server = require('./server')
const db = require('./db')
// const { test } = require('./knexfile')
// const res = require('express/lib/response')

jest.mock('./db')

beforeEach(() => {
  jest.resetAllMocks()
})

describe('get /wombles', () => {
  test('render the wombles', () => {
    expect.assertions(1)
    const fakeWomble = [
      {
        id: 88801,
        name: 'Great Uncle Bulgaria',
        characteristic_id: 99901,
        rubbish_id: 77701,
      },
    ]
    db.getAllWombles.mockReturnValue(Promise.resolve(fakeWomble))
    return request(server)
      .get('/wombles')
      .then((res) => {
        expect(res.text).toContain('Great Uncle Bulgaria')
      })
  })

  test(`returns status 500 and error message`, () => {
    expect.assertions(1)
    db.getAllWombles.mockImplementation(() => {
      return Promise.reject(new Error(`Test getAllWombles error`))
    })
    return request(server)
      .get(`/wombles`)
      .then((res) => {
        console.log(res.status)
        expect(res.status).toBe(500)
      })
  })
})

// test('list wombles', () => {
//   const expected = 'WOMBLES!'
//   return request(server)
//     .get('/')
//     .then((res) => {
//       return expect(res.text).toBe(expected)
//     })
// })

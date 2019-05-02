import { Express } from 'express'
import request, { Response } from 'supertest'
import App from 'Src/app'

jest.mock('Src/models/store.model')

describe('Store List Controller', () => {
  let app: Express

  beforeAll(async() => {
    app = await App()
  })

  beforeEach(() => {
    process.env.FORCE_TEST_FAILS = 'false'
  })

  test('GET:/api/store => Should return a list with 1 store ', async() => {
    const response: Response = await request(app).get('/api/store')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: '5a40022fb0091572150c5baa'
        })
      ])
    )
  })

  test('GET:/api/store => Should fail and return an error message', async() => {
    process.env.FORCE_TEST_FAILS = 'true'
    const response: Response = await request(app).get('/api/store')
    expect(response.status).toBe(500)
    expect(response.body).toEqual(
      expect.arrayContaining([])
    )
  })
})
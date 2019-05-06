import { Express } from 'express'
import request, { Response } from 'supertest'
import App from 'Src/app'

jest.mock('Src/models/store.model')

describe('Store Detail Controller - GET:/api/store/:name', () => {
  let app: Express

  beforeAll(async() => {
    app = await App()
  })

  beforeEach(() => {
    process.env.FORCE_TEST_FAILS = 'false'
  })

  test('Should return the complete data of a store', async() => {
    const response: Response = await request(app).get('/api/store/Pet%20Happy')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: '5a40022fb0091572150c5baa'
      })
    )
  })

  test('Should fail and return an error message', async() => {
    process.env.FORCE_TEST_FAILS = 'true'
    const response: Response = await request(app).get('/api/store/Pet%20Happy')
    expect(response.status).toBe(500)
    expect(response.body).toEqual(
      expect.objectContaining({
        error: true
      })
    )
  })
})
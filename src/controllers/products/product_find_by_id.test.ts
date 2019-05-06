import { Express } from 'express'
import request, { Response } from 'supertest'
import App from 'Src/app'

jest.mock('Src/models/product.model')

describe('Product Detail Controller - GET:/api/product/id/:id', () => {
  let app: Express

  beforeAll(async() => {
    app = await App()
  })

  beforeEach(() => {
    process.env.FORCE_TEST_FAILS = 'false'
  })

  test('Should return the complete data of a product', async() => {
    const response: Response = await request(app).get('/api/product/id/5a3a8f19a5dd062ccca49c2f')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: '5a3a8f19a5dd062ccca49c2f'
      })
    )
  })

  test('Should fail and return an error message', async() => {
    process.env.FORCE_TEST_FAILS = 'true'
    const response: Response = await request(app).get('/api/product/id/5a3a8f19a5dd062ccca49c2f')
    expect(response.status).toBe(500)
    expect(response.body).toEqual(
      expect.objectContaining({
        error: true
      })
    )
  })
})
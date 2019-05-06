import { Express } from 'express'
import request, { Response } from 'supertest'
import App from 'Src/app'

jest.mock('Src/models/product.model')

describe('Product Delete By Store and Category Controller - GET:/api/product/:store/:category', () => {
  let app: Express

  beforeAll(async() => {
    app = await App()
  })

  beforeEach(() => {
    process.env.FORCE_TEST_FAILS = 'false'
  })

  test('Should delete products whose store is "Tienda Pet" and category is "comida"', async() => {
    const response: Response = await request(app).delete('/api/product/tienda%20pet/comida')
    expect(response.status).toBe(200)
  })

  test('Should fail and return an error message', async() => {
    process.env.FORCE_TEST_FAILS = 'true'
    const response: Response = await request(app).delete('/api/product/tienda%20pet/comida')
    expect(response.status).toBe(500)
    expect(response.body).toEqual(
      expect.objectContaining({
        error: true
      })
    )
  })
})
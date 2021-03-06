import { Express } from 'express'
import request, { Response } from 'supertest'
import App from 'Src/app'

jest.mock('Src/models/product.model')

describe('Product Find By Category Controller - GET:/api/product/category/:category', () => {
  let app: Express

  beforeAll(async() => {
    app = await App()
  })

  beforeEach(() => {
    process.env.FORCE_TEST_FAILS = 'false'
  })

  test('Should return products whose category is "comida"', async() => {
    const response: Response = await request(app).get('/api/product/category/comida')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'royal canin maxi adulto 5 15 kg.'
        })
      ])
    )
  })

  test('Should fail and return an error message', async() => {
    process.env.FORCE_TEST_FAILS = 'true'
    const response: Response = await request(app).get('/api/product/category/comida')
    expect(response.status).toBe(500)
    expect(response.body).toEqual(
      expect.objectContaining({
        error: true
      })
    )
  })
})
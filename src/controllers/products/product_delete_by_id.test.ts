import { Express } from 'express'
import request, { Response } from 'supertest'
import App from 'Src/app'

jest.mock('Src/models/product.model')

describe('Product Delete By Store and Category Controller - DELETE:/api/product/id/:id', () => {
  let app: Express

  beforeAll(async() => {
    app = await App()
  })

  beforeEach(() => {
    process.env.FORCE_TEST_FAILS = 'false'
  })

  test('Should delete product with id "5a3a8f19a5dd062ccca49c2f"', async() => {
    const response: Response = await request(app).delete('/api/product/id/5a3a8f19a5dd062ccca49c2f')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true
      })
    )
  })

  test('Should fail and return an error message', async() => {
    process.env.FORCE_TEST_FAILS = 'true'
    const response: Response = await request(app).delete('/api/product/id/5a3a8f19a5dd062ccca49c2f')
    expect(response.status).toBe(500)
    expect(response.body).toEqual(
      expect.objectContaining({
        error: true
      })
    )
  })
})
import { Express } from 'express'
import request, { Response } from 'supertest'
import App from 'Src/app'

jest.mock('Src/models/product.model')

describe('Product Find By ID and Update Controller - PUT:/api/product/id/:id', () => {
  let app: Express
  const product = {
    animal: "perro",
    name: "royal canin maxi adulto 5 15 kg.",
    url: "https://www.tiendapet.cl/catalogo/producto/22/royal-canin-maxi-adulto-5",
    price: 43900,
    imageUrl: "https://tiendapet02.akamaized.net/assets/uploads/productos/47c10-royalcanin-(1).jpg",
    store: "Tienda Pet",
    category: "comida"
  }

  beforeAll(async() => {
    app = await App()
  })

  beforeEach(() => {
    process.env.FORCE_TEST_FAILS = 'false'
  })

  test('Should update one product', async() => {
    const response: Response = await request(app)
      .put('/api/product//id/5a3a8f19a5dd062ccca49c2f')
      .send({...product})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'royal canin maxi adulto 5 15 kg.'
      })
    )
  })

  test('Should fail and return an error message', async() => {
    process.env.FORCE_TEST_FAILS = 'true'
    const response: Response = await request(app)
      .put('/api/product/id/5a3a8f19a5dd062ccca49c2f')
      .send({...product})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(response.status).toBe(500)
    expect(response.body).toEqual(
      expect.objectContaining({
        error: true
      })
    )
  })
})
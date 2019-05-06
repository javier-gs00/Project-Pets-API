import { Express } from 'express'
import request, { Response } from 'supertest'
import App from 'Src/app'

describe('Test the root path', () => {
  let app: Express

  beforeAll(async () => {
    app = await App()
  })

  test('It should respond the GET method', async () => {
    const response: Response = await request(app).get('/')
    expect(response.status).toBe(200)
  })
})
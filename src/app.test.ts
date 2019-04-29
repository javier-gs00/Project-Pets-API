import { Express } from 'express'
import request from 'supertest'
import App from 'Src/app'

describe('Test the root path', () => {
  let app: Express

  beforeAll(async () => {
    app = await App()
  })

  test('It should respond the GET method', async () => {
    // const app: Express = await App()
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
  })
})
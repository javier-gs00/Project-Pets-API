import request from 'supertest'
import app from 'Src'

describe('Test the root path', () => {
  test('It should responde the GET method', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
  })
})
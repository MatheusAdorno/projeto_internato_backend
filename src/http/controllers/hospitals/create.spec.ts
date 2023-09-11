import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Hospital (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a hospital', async () => {
    const { token } = await createAndAuthenticateUser(app, 'UNIVERSITY_ADMIN')

    const response = await request(app.server)
      .post('/hospitals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Einstein',
        latitude: -23.5999746,
        longitude: -46.7178322,
      })

    expect(response.statusCode).toEqual(201)
  })
})

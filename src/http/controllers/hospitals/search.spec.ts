import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Hospitals (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to search for hospitals', async () => {
    const { token } = await createAndAuthenticateUser(app, 'GENERAL_ADMIN')

    await request(app.server)
      .post('/hospitals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Einstein',
        latitude: -23.5999746,
        longitude: -46.7178322,
      })

    await request(app.server)
      .post('/hospitals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Hospital das Clínicas',
        latitude: -23.5577989,
        longitude: -46.6724347,
      })

    const response = await request(app.server)
      .get('/hospitals/search')
      .query({
        query: 'Einstein',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.hospitals).toHaveLength(1)
    expect(response.body.hospitals).toEqual([
      expect.objectContaining({
        name: 'Einstein',
      }),
    ])
  })
})

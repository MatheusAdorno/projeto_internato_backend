import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Search Internships (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to search for internships', async () => {
    const { token } = await createAndAuthenticateUser(app, 'GENERAL_ADMIN')

    const hospital = await prisma.hospital.create({
      data: {
        name: 'Einstein',
        latitude: -23.5999746,
        longitude: -46.7178322,
      },
    })

    await request(app.server)
      .post('/internships')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Clínica Médica',
        description: null,
        hospital_id: hospital.id,
      })

    await request(app.server)
      .post('/internships')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Ginecologia e Obstetrícia',
        description: null,
        hospital_id: hospital.id,
      })

    const response = await request(app.server)
      .get('/internships/search')
      .query({
        query: 'Clínica',
        hospitalId: '',
        userId: '',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.internships).toHaveLength(1)
    expect(response.body.internships).toEqual([
      expect.objectContaining({
        title: 'Clínica Médica',
      }),
    ])
  })
})

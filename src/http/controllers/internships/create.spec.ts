import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Internship (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an Internship', async () => {
    const { token } = await createAndAuthenticateUser(app, 'PRECEPTOR')

    const hospital = await prisma.hospital.create({
      data: {
        name: 'Einstein',
        latitude: -23.5999746,
        longitude: -46.7178322,
      },
    })

    const response = await request(app.server)
      .post('/internships')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Clínica Médica',
        description: null,
        hospital_id: hospital.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})

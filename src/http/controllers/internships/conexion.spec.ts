import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Internship-User Conexion (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a conexion between an Internship and User', async () => {
    const { token } = await createAndAuthenticateUser(app, 'PRECEPTOR')

    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoeteste@example.com',
        password_hash: '123456',
      },
    })

    const hospital = await prisma.hospital.create({
      data: {
        name: 'Einstein',
        latitude: -23.5999746,
        longitude: -46.7178322,
      },
    })

    const internship = await prisma.internship.create({
      data: {
        title: 'Clínica Médica',
        description: null,
        hospital_id: hospital.id,
      },
    })

    const response = await request(app.server)
      .post('/internships/conexions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        internshipId: internship.id,
        userId: user.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})

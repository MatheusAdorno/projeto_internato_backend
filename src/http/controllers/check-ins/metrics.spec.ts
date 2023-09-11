import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-in Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the count of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

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

    await prisma.checkIn.createMany({
      data: [
        { user_id: user.id, internship_id: internship.id },
        { user_id: user.id, internship_id: internship.id },
        { user_id: user.id, internship_id: internship.id },
      ],
    })

    const response = await request(app.server)
      .get(`/check-ins/metrics/${internship.id}/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(3)
  })
})

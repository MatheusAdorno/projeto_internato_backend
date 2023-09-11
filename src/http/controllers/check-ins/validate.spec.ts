import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a check-in', async () => {
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

    let checkIn = await prisma.checkIn.create({
      data: {
        internship_id: internship.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validade`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})

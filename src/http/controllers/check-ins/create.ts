import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInService } from '@/services/factories/make-check-in-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    internshipId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    // If student can create his own check-in, delete next line
    userId: z.string(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { internshipId } = createCheckInParamsSchema.parse(request.params)
  const { userId, latitude, longitude } = createCheckInBodySchema.parse(
    request.body,
  )

  const createHospitalService = makeCheckInService()

  await createHospitalService.execute({
    internshipId,
    userId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  /** Use this when student can create his checkIn */
  // await createHospitalService.execute({
  //   internshipId,
  //   userId: request.user.sub,
  //   userLatitude: latitude,
  //   userLongitude: longitude,
  // })

  return reply.status(201).send()
}

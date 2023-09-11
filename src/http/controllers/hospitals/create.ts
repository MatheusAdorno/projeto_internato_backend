import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateHospitalService } from '@/services/factories/make-create-hospital-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createHospitalBodySchema = z.object({
    name: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { name, latitude, longitude } = createHospitalBodySchema.parse(
    request.body,
  )

  const createHospitalService = makeCreateHospitalService()

  await createHospitalService.execute({ name, latitude, longitude })

  return reply.status(201).send()
}

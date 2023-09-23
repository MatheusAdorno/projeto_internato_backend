import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateInternshipService } from '@/services/factories/make-create-internship-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createInternshipBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    hospital_id: z.string().uuid(),
    cicle_id: z.string().uuid(),
    hospitalArea_id: z.string().uuid(),
    preceptor_id: z.string().uuid(),
    period_id: z.string().uuid(),
  })

  const {
    title,
    description,
    hospital_id,
    cicle_id,
    hospitalArea_id,
    preceptor_id,
    period_id,
  } = createInternshipBodySchema.parse(request.body)

  const createInternshipService = makeCreateInternshipService()

  await createInternshipService.execute({
    title,
    description,
    hospital_id,
    user_id: request.user.sub,
    cicle_id,
    hospitalArea_id,
    preceptor_id,
    period_id,
  })

  return reply.status(201).send()
}

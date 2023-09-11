import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateActivityImplementationService } from '@/services/factories/make-create-activity-implementation-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createActivityImplementationBodySchema = z.object({
    activity_id: z.string(),
    dateStart: z.date(),
    dateEnd: z.date(),
    hourStart: z.date(),
    hourEnd: z.date(),
    user_id: z.string(),
    internship_id: z.string(),
    hospital_id: z.string(),
    hospitalArea_id: z.string(),
    preceptor_id: z.string(),
  })

  const {
    activity_id,
    dateStart,
    dateEnd,
    hourStart,
    hourEnd,
    user_id,
    internship_id,
    hospital_id,
    hospitalArea_id,
    preceptor_id,
  } = createActivityImplementationBodySchema.parse(request.body)

  const createActivityImplementationService =
    makeCreateActivityImplementationService()

  await createActivityImplementationService.execute({
    activity_id,
    dateStart,
    dateEnd,
    hourStart,
    hourEnd,
    user_id,
    internship_id,
    hospital_id,
    hospitalArea_id,
    preceptor_id,
  })

  return reply.status(201).send()
}

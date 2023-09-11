import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateActivityService } from '@/services/factories/make-create-activity-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createActivityBodySchema = z.object({
    title: z.string(),
    description: z.string(),
  })

  const { title, description } = createActivityBodySchema.parse(request.body)

  const createActivityService = makeCreateActivityService()

  await createActivityService.execute({ title, description })

  return reply.status(201).send()
}

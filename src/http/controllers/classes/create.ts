import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateClassService } from '@/services/factories/make-create-class-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createClassBodySchema = z.object({
    title: z.string(),
    description: z.string(),
  })

  const { title, description } = createClassBodySchema.parse(request.body)

  const createClassService = makeCreateClassService()

  await createClassService.execute({ title, description })

  return reply.status(201).send()
}

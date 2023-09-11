import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateCicleService } from '@/services/factories/make-create-cicle-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCicleBodySchema = z.object({
    title: z.string(),
    description: z.string(),
  })

  const { title, description } = createCicleBodySchema.parse(request.body)

  const createCicleService = makeCreateCicleService()

  await createCicleService.execute({ title, description })

  return reply.status(201).send()
}

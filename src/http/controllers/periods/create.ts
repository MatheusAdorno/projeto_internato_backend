import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePeriodService } from '@/services/factories/make-create-period-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPeriodBodySchema = z.object({
    title: z.string(),
    description: z.string(),
  })

  const { title, description } = createPeriodBodySchema.parse(request.body)

  const createPeriodService = makeCreatePeriodService()

  await createPeriodService.execute({ title, description })

  return reply.status(201).send()
}

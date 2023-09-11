import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateSubgroupService } from '@/services/factories/make-create-subgroup-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createsubgroupBodySchema = z.object({
    title: z.string(),
    description: z.string(),
  })

  const { title, description } = createsubgroupBodySchema.parse(request.body)

  const createSubgroupService = makeCreateSubgroupService()

  await createSubgroupService.execute({ title, description })

  return reply.status(201).send()
}

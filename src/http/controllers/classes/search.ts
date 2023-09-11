import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchClassesService } from '@/services/factories/make-search-classes-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchClassesQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchClassesQuerySchema.parse(request.query)

  const searchClassesService = makeSearchClassesService()

  const { classes } = await searchClassesService.execute({ query, page })

  return reply.status(200).send({
    classes,
  })
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchCiclesService } from '@/services/factories/make-search-cicles-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchCiclesQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchCiclesQuerySchema.parse(request.query)

  const searchCiclesService = makeSearchCiclesService()

  const { cicles } = await searchCiclesService.execute({ query, page })

  return reply.status(200).send({
    cicles,
  })
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPeriodsService } from '@/services/factories/make-search-periods-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPeriodsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchPeriodsQuerySchema.parse(request.query)

  const searchPeriodsService = makeSearchPeriodsService()

  const { periods } = await searchPeriodsService.execute({ query, page })

  return reply.status(200).send({
    periods,
  })
}

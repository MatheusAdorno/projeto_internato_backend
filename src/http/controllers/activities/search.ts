import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchActivitiesService } from '@/services/factories/make-search-activities-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchActivitiesQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchActivitiesQuerySchema.parse(request.query)

  const searchActivitysService = makeSearchActivitiesService()

  const { activities } = await searchActivitysService.execute({ query, page })

  return reply.status(200).send({
    activities,
  })
}

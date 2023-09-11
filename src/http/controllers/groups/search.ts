import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGroupsService } from '@/services/factories/make-search-groups-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGroupsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGroupsQuerySchema.parse(request.query)

  const searchGroupsService = makeSearchGroupsService()

  const { groups } = await searchGroupsService.execute({ query, page })

  return reply.status(200).send({
    groups,
  })
}

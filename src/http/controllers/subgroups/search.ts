import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchSubgroupsService } from '@/services/factories/make-search-subgroups-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchSubgroupsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchSubgroupsQuerySchema.parse(request.query)

  const searchSubgroupsService = makeSearchSubgroupsService()

  const { subgroups } = await searchSubgroupsService.execute({ query, page })

  return reply.status(200).send({
    subgroups,
  })
}

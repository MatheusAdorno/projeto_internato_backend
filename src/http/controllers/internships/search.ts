import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchInternshipsService } from '@/services/factories/make-search-internships-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchInsternshipsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
    hospitalId: z.string(),
    userId: z.string(),
  })

  const { query, page, hospitalId, userId } =
    searchInsternshipsQuerySchema.parse(request.query)

  const searchInternshipsService = makeSearchInternshipsService()

  const { internships } = await searchInternshipsService.execute({
    query,
    page,
    hospitalId,
    userId,
  })

  return reply.status(200).send({
    internships,
  })
}

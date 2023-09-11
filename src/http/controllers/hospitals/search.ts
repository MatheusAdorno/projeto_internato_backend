import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchHospitalsService } from '@/services/factories/make-search-hospitals-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchHospitalsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchHospitalsQuerySchema.parse(request.query)

  const searchHospitalsService = makeSearchHospitalsService()

  const { hospitals } = await searchHospitalsService.execute({ query, page })

  return reply.status(200).send({
    hospitals,
  })
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPreceptorsService } from '@/services/factories/make-search-preceptors-service'

export async function searchPreceptors(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchPreceptorsQuerySchema = z.object({
    name: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { name, page } = searchPreceptorsQuerySchema.parse(request.query)

  const searchPreceptorsService = makeSearchPreceptorsService()

  const { users } = await searchPreceptorsService.execute({ name, page })

  return reply.status(200).send({
    users,
  })
}

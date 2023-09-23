import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchUsersService } from '@/services/factories/make-search-users-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchUsersQuerySchema = z.object({
    name: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { name, page } = searchUsersQuerySchema.parse(request.query)

  const searchUsersService = makeSearchUsersService()

  const { users } = await searchUsersService.execute({ name, page })

  return reply.status(200).send({
    users,
  })
}

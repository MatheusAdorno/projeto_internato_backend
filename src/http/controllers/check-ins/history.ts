import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryParamsSchema = z.object({
    // If student can create his own check-in, delete next line
    userId: z.string().uuid(),
  })

  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { userId } = checkInHistoryParamsSchema.parse(request.params)
  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryService = makeFetchUserCheckInsHistoryService()

  const { checkIns } = await fetchUserCheckInsHistoryService.execute({
    userId,
    page,
  })

  /** User this when user can see his own check-ins history */
  // const { checkIns } = await fetchUserCheckInsHistoryService.execute({
  //   userId,
  //   page,
  // })

  return reply.status(200).send({
    checkIns,
  })
}

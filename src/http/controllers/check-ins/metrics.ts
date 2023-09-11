import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetUserInternshipMetricsService } from '@/services/factories/make-get-user-internship-metrics-service'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserInternshipMetricsParamsSchema = z.object({
    internshipId: z.string().uuid(),
    userId: z.string().uuid(),
  })

  const { internshipId, userId } = getUserInternshipMetricsParamsSchema.parse(
    request.params,
  )

  const getUserInternshipMetricsService = makeGetUserInternshipMetricsService()

  const { checkInsCount } = await getUserInternshipMetricsService.execute({
    userId,
    internshipId,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}

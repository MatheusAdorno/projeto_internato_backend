import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateUserInternshipConexionService } from '@/services/factories/make-create-user-internship-conexion-service'

export async function conexion(request: FastifyRequest, reply: FastifyReply) {
  const createUserInternshipConexionBodySchema = z.object({
    internshipId: z.string().uuid(),
    userId: z.string().uuid(),
  })

  const { internshipId, userId } = createUserInternshipConexionBodySchema.parse(
    request.body,
  )

  const createUserInternshipConexionService =
    makeCreateUserInternshipConexionService()

  await createUserInternshipConexionService.execute({
    internshipId,
    userId,
  })

  return reply.status(201).send()
}

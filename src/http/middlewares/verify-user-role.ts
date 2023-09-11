import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(
  roleToVerify: Array<
    | 'GENERAL_ADMIN'
    | 'UNIVERSITY_ADMIN'
    | 'HOSPITAL_ADMIN'
    | 'PRECEPTOR'
    | 'STUDENT'
  >,
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (!roleToVerify.includes(role)) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}

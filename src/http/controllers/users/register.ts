import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeRegisterService } from '@/services/factories/make-register-service'
import { PasswordDoesNotMatchError } from '@/services/errors/password-does-not-match-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })

  const { name, email, password, confirmPassword } = registerBodySchema.parse(
    request.body,
  )

  try {
    if (password !== confirmPassword) {
      throw new PasswordDoesNotMatchError()
    }

    const registerService = makeRegisterService()

    await registerService.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof PasswordDoesNotMatchError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}

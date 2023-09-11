import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGroupService } from '@/services/factories/make-create-group-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGroupBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    class_id: z.string(),
  })

  const { title, description, class_id } = createGroupBodySchema.parse(
    request.body,
  )

  const createGroupService = makeCreateGroupService()

  await createGroupService.execute({ title, description, class_id })

  return reply.status(201).send()
}

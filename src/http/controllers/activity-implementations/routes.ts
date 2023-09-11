import { FastifyInstance } from 'fastify'

import { verifyJWt } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function activityImplementationsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWt)

  app.post(
    '/activityImplementations',
    {
      onRequest: [verifyUserRole(['GENERAL_ADMIN', 'UNIVERSITY_ADMIN'])],
    },
    create,
  )
}

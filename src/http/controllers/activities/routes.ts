import { FastifyInstance } from 'fastify'

import { verifyJWt } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function activitiesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWt)

  app.get(
    '/activities/search',
    {
      onRequest: [
        verifyUserRole(['GENERAL_ADMIN', 'UNIVERSITY_ADMIN', 'STUDENT']),
      ],
    },
    search,
  )

  app.post(
    '/activities',
    {
      onRequest: [verifyUserRole(['GENERAL_ADMIN', 'UNIVERSITY_ADMIN'])],
    },
    create,
  )
}

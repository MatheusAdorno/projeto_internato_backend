import { FastifyInstance } from 'fastify'

import { verifyJWt } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function ciclesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWt)

  app.get(
    '/cicles/search',
    {
      onRequest: [
        verifyUserRole(['GENERAL_ADMIN', 'UNIVERSITY_ADMIN', 'STUDENT']),
      ],
    },
    search,
  )

  app.post(
    '/cicles',
    {
      onRequest: [verifyUserRole(['GENERAL_ADMIN', 'UNIVERSITY_ADMIN'])],
    },
    create,
  )
}

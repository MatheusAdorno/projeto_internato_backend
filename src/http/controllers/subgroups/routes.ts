import { FastifyInstance } from 'fastify'

import { verifyJWt } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function subgroupsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWt)

  app.get(
    '/subgroups/search',
    {
      onRequest: [
        verifyUserRole(['GENERAL_ADMIN', 'UNIVERSITY_ADMIN', 'STUDENT']),
      ],
    },
    search,
  )

  app.post(
    '/subgroups',
    {
      onRequest: [verifyUserRole(['GENERAL_ADMIN', 'UNIVERSITY_ADMIN'])],
    },
    create,
  )
}

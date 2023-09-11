import { FastifyInstance } from 'fastify'

import { verifyJWt } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { metrics } from './metrics'
import { history } from './history'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWt)

  app.get(
    '/check-ins/history/:internshipId/:userId',
    {
      onRequest: verifyUserRole([
        'STUDENT',
        'PRECEPTOR',
        'HOSPITAL_ADMIN',
        'UNIVERSITY_ADMIN',
        'GENERAL_ADMIN',
      ]),
    },
    history,
  )
  app.get(
    '/check-ins/metrics/:internshipId/:userId',
    {
      onRequest: verifyUserRole([
        'STUDENT',
        'PRECEPTOR',
        'HOSPITAL_ADMIN',
        'UNIVERSITY_ADMIN',
        'GENERAL_ADMIN',
      ]),
    },
    metrics,
  )

  app.post(
    '/internships/:internshipId/check-ins',
    {
      onRequest: verifyUserRole([
        'STUDENT',
        'PRECEPTOR',
        'HOSPITAL_ADMIN',
        'UNIVERSITY_ADMIN',
        'GENERAL_ADMIN',
      ]),
    },
    create,
  )
  app.patch(
    '/check-ins/:checkInId/validade',
    {
      onRequest: verifyUserRole([
        'PRECEPTOR',
        'HOSPITAL_ADMIN',
        'UNIVERSITY_ADMIN',
        'GENERAL_ADMIN',
      ]),
    },
    validate,
  )
}

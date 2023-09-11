import { FastifyInstance } from 'fastify'

import { verifyJWt } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { create } from './create'
import { conexion } from './conexion'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function internshipsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWt)

  app.get(
    '/internships/search',
    {
      onRequest: verifyUserRole([
        'STUDENT',
        'PRECEPTOR',
        'HOSPITAL_ADMIN',
        'UNIVERSITY_ADMIN',
        'GENERAL_ADMIN',
      ]),
    },
    search,
  )

  app.post(
    '/internships',
    {
      onRequest: verifyUserRole([
        'PRECEPTOR',
        'HOSPITAL_ADMIN',
        'UNIVERSITY_ADMIN',
        'GENERAL_ADMIN',
      ]),
    },
    create,
  )
  app.post(
    '/internships/conexions',
    {
      onRequest: verifyUserRole([
        'PRECEPTOR',
        'HOSPITAL_ADMIN',
        'UNIVERSITY_ADMIN',
        'GENERAL_ADMIN',
      ]),
    },
    conexion,
  )
}

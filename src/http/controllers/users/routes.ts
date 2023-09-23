import { FastifyInstance } from 'fastify'

import { verifyJWt } from '@/http/middlewares/verify-jwt'

import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { search } from './search'
import { searchPreceptors } from './search-preceptors'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWt] }, profile)

  app.get(
    '/cicles/search',
    {
      onRequest: [verifyJWt],
    },
    search,
  )

  app.get(
    '/cicles/search-preceptors',
    {
      onRequest: [verifyJWt],
    },
    searchPreceptors,
  )
}

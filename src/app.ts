import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { usersRoutes } from './http/controllers/users/routes'
import { hospitalsRoutes } from './http/controllers/hospitals/routes'
import { internshipsRoutes } from './http/controllers/internships/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
import { classesRoutes } from './http/controllers/classes/routes'
import { groupsRoutes } from './http/controllers/groups/routes'
import { subgroupsRoutes } from './http/controllers/subgroups/routes'
import { periodsRoutes } from './http/controllers/periods/routes'
import { ciclesRoutes } from './http/controllers/cicles/routes'
import { activitiesRoutes } from './http/controllers/activities/routes'
import { activityImplementationsRoutes } from './http/controllers/activity-implementations/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(require('@fastify/swagger'))

app.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next()
    },
    preHandler: function (request, reply, next) {
      next()
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject
  },
  transformSpecificationClone: true,
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(hospitalsRoutes)
app.register(internshipsRoutes)
app.register(checkInsRoutes)
app.register(classesRoutes)
app.register(groupsRoutes)
app.register(subgroupsRoutes)
app.register(periodsRoutes)
app.register(ciclesRoutes)
app.register(activitiesRoutes)
app.register(activityImplementationsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DotaDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      role:
        | 'GENERAL_ADMIN'
        | 'UNIVERSITY_ADMIN'
        | 'HOSPITAL_ADMIN'
        | 'PRECEPTOR'
        | 'STUDENT'
    }
  }
}

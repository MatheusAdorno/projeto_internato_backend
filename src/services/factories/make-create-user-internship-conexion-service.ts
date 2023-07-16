import { CreateUserInternshipConexionService } from '../create-user-internship-conexion'
import { PrismaUserInternshipConexionsRepository } from '@/repositories/prisma/prisma-user-internship-conexions-repository'

export function makeCreateUserInternshipConexionService() {
  const userInternshipConexionsRepository =
    new PrismaUserInternshipConexionsRepository()
  const service = new CreateUserInternshipConexionService(
    userInternshipConexionsRepository,
  )

  return service
}

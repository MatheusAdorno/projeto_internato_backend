import { PrismaInternshipsRepository } from '@/repositories/prisma/prisma-internships-repository'
import { CreateInternshipService } from '../create-internship'
import { PrismaUserInternshipConexionsRepository } from '@/repositories/prisma/prisma-user-internship-conexions-repository'

export function makeCreateInternshipService() {
  const internshipsRepository = new PrismaInternshipsRepository()
  const userInternshipConexionsRepository =
    new PrismaUserInternshipConexionsRepository()
  const service = new CreateInternshipService(
    internshipsRepository,
    userInternshipConexionsRepository,
  )

  return service
}

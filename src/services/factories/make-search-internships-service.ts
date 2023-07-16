import { PrismaUserInternshipConexionsRepository } from '@/repositories/prisma/prisma-user-internship-conexions-repository'
import { SearchInternshipsService } from '../search-internships'
import { PrismaInternshipsRepository } from '@/repositories/prisma/prisma-internships-repository'

export function makeSearchInternshipsService() {
  const internshipsRepository = new PrismaInternshipsRepository()
  const userInternshipConexionsRepository =
    new PrismaUserInternshipConexionsRepository()
  const service = new SearchInternshipsService(
    internshipsRepository,
    userInternshipConexionsRepository,
  )

  return service
}

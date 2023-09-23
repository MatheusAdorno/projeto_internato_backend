import { SearchPreceptorsService } from '../search-preceptors'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeSearchPreceptorsService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new SearchPreceptorsService(usersRepository)

  return service
}

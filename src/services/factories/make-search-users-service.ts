import { SearchUsersService } from '../search-users'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeSearchUsersService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new SearchUsersService(usersRepository)

  return service
}

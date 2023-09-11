import { PrismaGroupsRepository } from '@/repositories/prisma/prisma-groups-repository'
import { SearchGroupsService } from '../search-groups'

export function makeSearchGroupsService() {
  const groupsRepository = new PrismaGroupsRepository()
  const service = new SearchGroupsService(groupsRepository)

  return service
}

import { PrismaSubgroupsRepository } from '@/repositories/prisma/prisma-subgroups-repository'
import { SearchSubgroupsService } from '../search-subgroups'

export function makeSearchSubgroupsService() {
  const subgroupsRepository = new PrismaSubgroupsRepository()
  const service = new SearchSubgroupsService(subgroupsRepository)

  return service
}

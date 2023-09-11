import { PrismaSubgroupsRepository } from '@/repositories/prisma/prisma-subgroups-repository'
import { CreateSubgroupService } from '../create-subgroup'

export function makeCreateSubgroupService() {
  const subgroupsRepository = new PrismaSubgroupsRepository()
  const service = new CreateSubgroupService(subgroupsRepository)

  return service
}

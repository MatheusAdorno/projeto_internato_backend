import { PrismaGroupsRepository } from '@/repositories/prisma/prisma-groups-repository'
import { CreateGroupService } from '../create-group'

export function makeCreateGroupService() {
  const groupsRepository = new PrismaGroupsRepository()
  const service = new CreateGroupService(groupsRepository)

  return service
}

import { PrismaActivityImplementationsRepository } from '@/repositories/prisma/prisma-activity-implementations-repository'
import { CreateActivityImplementationService } from '../create-activity-implementation'

export function makeCreateActivityImplementationService() {
  const activityImplementationsRepository =
    new PrismaActivityImplementationsRepository()
  const service = new CreateActivityImplementationService(
    activityImplementationsRepository,
  )

  return service
}

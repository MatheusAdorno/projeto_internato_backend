import { PrismaActivitiesRepository } from '@/repositories/prisma/prisma-activities-repository'
import { CreateActivityService } from '../create-activity'

export function makeCreateActivityService() {
  const activitiesRepository = new PrismaActivitiesRepository()
  const service = new CreateActivityService(activitiesRepository)

  return service
}

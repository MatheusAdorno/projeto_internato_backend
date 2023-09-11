import { PrismaActivitiesRepository } from '@/repositories/prisma/prisma-activities-repository'
import { SearchActivitiesService } from '../search-activities'

export function makeSearchActivitiesService() {
  const ActivitiesRepository = new PrismaActivitiesRepository()
  const service = new SearchActivitiesService(ActivitiesRepository)

  return service
}

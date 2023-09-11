import { PrismaPeriodsRepository } from '@/repositories/prisma/prisma-periods-repository'
import { SearchPeriodsService } from '../search-periods'

export function makeSearchPeriodsService() {
  const periodsRepository = new PrismaPeriodsRepository()
  const service = new SearchPeriodsService(periodsRepository)

  return service
}

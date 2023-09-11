import { PrismaPeriodsRepository } from '@/repositories/prisma/prisma-periods-repository'
import { CreatePeriodService } from '../create-period'

export function makeCreatePeriodService() {
  const periodsRepository = new PrismaPeriodsRepository()
  const service = new CreatePeriodService(periodsRepository)

  return service
}

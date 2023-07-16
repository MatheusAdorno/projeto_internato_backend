import { GetUserInternshipMetricsService } from '../get-user-internship-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserInternshipMetricsService() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const service = new GetUserInternshipMetricsService(checkinsRepository)

  return service
}

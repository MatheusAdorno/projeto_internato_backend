import { PrismaInternshipsRepository } from '@/repositories/prisma/prisma-internships-repository'
import { CheckInService } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaHospitalsRepository } from '@/repositories/prisma/prisma-hospitals-repository'

export function makeCheckInService() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const internshipsRepository = new PrismaInternshipsRepository()
  const hospitalsRepository = new PrismaHospitalsRepository()
  const service = new CheckInService(
    checkinsRepository,
    internshipsRepository,
    hospitalsRepository,
  )

  return service
}

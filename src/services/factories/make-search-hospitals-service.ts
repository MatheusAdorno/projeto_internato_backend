import { SearchHospitalsService } from '../search-hospitals'
import { PrismaHospitalsRepository } from '@/repositories/prisma/prisma-hospitals-repository'

export function makeSearchHospitalsService() {
  const hospitalsRepository = new PrismaHospitalsRepository()
  const service = new SearchHospitalsService(hospitalsRepository)

  return service
}

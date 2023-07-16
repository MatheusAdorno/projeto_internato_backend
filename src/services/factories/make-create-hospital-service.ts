import { CreateHospitalService } from '../create-hospital'
import { PrismaHospitalsRepository } from '@/repositories/prisma/prisma-hospitals-repository'

export function makeCreateHospitalService() {
  const hospitalsRepository = new PrismaHospitalsRepository()
  const service = new CreateHospitalService(hospitalsRepository)

  return service
}

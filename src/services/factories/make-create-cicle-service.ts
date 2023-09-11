import { PrismaCiclesRepository } from '@/repositories/prisma/prisma-cicles-repository'
import { CreateCicleService } from '../create-cicle'

export function makeCreateCicleService() {
  const ciclesRepository = new PrismaCiclesRepository()
  const service = new CreateCicleService(ciclesRepository)

  return service
}

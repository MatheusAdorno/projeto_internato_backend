import { PrismaCiclesRepository } from '@/repositories/prisma/prisma-cicles-repository'
import { SearchCiclesService } from '../search-cicles'

export function makeSearchCiclesService() {
  const ciclesRepository = new PrismaCiclesRepository()
  const service = new SearchCiclesService(ciclesRepository)

  return service
}

import { PrismaClassesRepository } from '@/repositories/prisma/prisma-classes-repository'
import { SearchClassesService } from '../search-classes'

export function makeSearchClassesService() {
  const classesRepository = new PrismaClassesRepository()
  const service = new SearchClassesService(classesRepository)

  return service
}

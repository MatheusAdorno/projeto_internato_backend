import { PrismaClassesRepository } from '@/repositories/prisma/prisma-classes-repository'
import { CreateClassService } from '../create-class'

export function makeCreateClassService() {
  const classesRepository = new PrismaClassesRepository()
  const service = new CreateClassService(classesRepository)

  return service
}

import { Class, Prisma } from '@prisma/client'

export interface ClassesRepository {
  create(data: Prisma.ClassCreateInput): Promise<Class>
  findById(id: string): Promise<Class | null>
  searchMany(query: string | null, page: number): Promise<Class[]>
}

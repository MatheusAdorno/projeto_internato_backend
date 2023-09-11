import { Cicle, Prisma } from '@prisma/client'

export interface CiclesRepository {
  create(data: Prisma.CicleCreateInput): Promise<Cicle>
  findById(id: string): Promise<Cicle | null>
  searchMany(query: string | null, page: number): Promise<Cicle[]>
}

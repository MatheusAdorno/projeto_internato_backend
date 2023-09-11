import { Period, Prisma } from '@prisma/client'

export interface PeriodsRepository {
  create(data: Prisma.PeriodCreateInput): Promise<Period>
  findById(id: string): Promise<Period | null>
  searchMany(query: string | null, page: number): Promise<Period[]>
}

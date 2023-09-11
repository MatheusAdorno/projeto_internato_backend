import { Subgroup, Prisma } from '@prisma/client'

export interface SubgroupsRepository {
  create(data: Prisma.SubgroupCreateInput): Promise<Subgroup>
  findById(id: string): Promise<Subgroup | null>
  searchMany(query: string | null, page: number): Promise<Subgroup[]>
}

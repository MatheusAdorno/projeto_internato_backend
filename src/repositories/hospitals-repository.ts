import { Hospital, Prisma } from '@prisma/client'

export interface HospitalsRepository {
  create(data: Prisma.HospitalCreateInput): Promise<Hospital>
  findById(id: string): Promise<Hospital | null>
  searchMany(query: string | null, page: number): Promise<Hospital[]>
}

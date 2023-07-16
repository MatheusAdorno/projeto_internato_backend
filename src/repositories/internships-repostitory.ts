import { Internship, Prisma } from '@prisma/client'

export interface InternshipsRepository {
  create(data: Prisma.InternshipUncheckedCreateInput): Promise<Internship>
  findById(id: string): Promise<Internship | null>
  searchMany(
    query: string | null,
    page: number,
    hospitalId: string | null,
    userInternshipIds: string[] | null,
  ): Promise<Internship[]>
}

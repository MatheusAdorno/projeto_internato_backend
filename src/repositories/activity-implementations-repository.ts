import { ActivityImplementation, Prisma } from '@prisma/client'

export interface ActivityImplementationsRepository {
  create(
    data: Prisma.ActivityImplementationUncheckedCreateInput,
  ): Promise<ActivityImplementation>
  findById(id: string): Promise<ActivityImplementation | null>
  // searchMany(
  //   query: string | null,
  //   page: number,
  // ): Promise<ActivityImplementation[]>
}

import { Activity, Prisma } from '@prisma/client'

export interface ActivitiesRepository {
  create(data: Prisma.ActivityCreateInput): Promise<Activity>
  findById(id: string): Promise<Activity | null>
  searchMany(query: string | null, page: number): Promise<Activity[]>
}

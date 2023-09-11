import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ActivitiesRepository } from '../activities-repository'

export class PrismaActivitiesRepository implements ActivitiesRepository {
  async create(data: Prisma.ActivityCreateInput) {
    const activity = await prisma.activity.create({
      data,
    })

    return activity
  }

  async findById(id: string) {
    const activity = await prisma.activity.findUnique({
      where: {
        id,
      },
    })

    return activity
  }

  async searchMany(query: string | null, page: number) {
    if (query) {
      const activities = await prisma.activity.findMany({
        where: {
          title: {
            contains: query,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return activities
    }

    const activities = await prisma.activity.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return activities
  }
}

import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PeriodsRepository } from '../periods-repository'

export class PrismaPeriodsRepository implements PeriodsRepository {
  async create(data: Prisma.PeriodCreateInput) {
    const period = await prisma.period.create({
      data,
    })

    return period
  }

  async findById(id: string) {
    const period = await prisma.period.findUnique({
      where: {
        id,
      },
    })

    return period
  }

  async searchMany(query: string | null, page: number) {
    if (query) {
      const periods = await prisma.period.findMany({
        where: {
          title: {
            contains: query,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return periods
    }

    const periods = await prisma.period.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return periods
  }
}

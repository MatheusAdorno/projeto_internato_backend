import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { CiclesRepository } from '../cicles-repository'

export class PrismaCiclesRepository implements CiclesRepository {
  async create(data: Prisma.CicleCreateInput) {
    const cicle = await prisma.cicle.create({
      data,
    })

    return cicle
  }

  async findById(id: string) {
    const cicle = await prisma.cicle.findUnique({
      where: {
        id,
      },
    })

    return cicle
  }

  async searchMany(query: string | null, page: number) {
    if (query) {
      const cicles = await prisma.cicle.findMany({
        where: {
          title: {
            contains: query,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return cicles
    }

    const cicles = await prisma.cicle.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return cicles
  }
}

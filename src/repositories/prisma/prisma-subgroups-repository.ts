import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { SubgroupsRepository } from '../subgroups-repository'

export class PrismaSubgroupsRepository implements SubgroupsRepository {
  async create(data: Prisma.SubgroupCreateInput) {
    const subgroup = await prisma.subgroup.create({
      data,
    })

    return subgroup
  }

  async findById(id: string) {
    const subgroup = await prisma.subgroup.findUnique({
      where: {
        id,
      },
    })

    return subgroup
  }

  async searchMany(query: string | null, page: number) {
    if (query) {
      const subgroups = await prisma.subgroup.findMany({
        where: {
          title: {
            contains: query,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return subgroups
    }

    const subgroups = await prisma.subgroup.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return subgroups
  }
}

import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { GroupsRepository } from '../groups-repository'

export class PrismaGroupsRepository implements GroupsRepository {
  async create(data: Prisma.GroupCreateInput) {
    const group = await prisma.group.create({
      data,
    })

    return group
  }

  async findById(id: string) {
    const group = await prisma.group.findUnique({
      where: {
        id,
      },
    })

    return group
  }

  async searchMany(query: string | null, page: number) {
    if (query) {
      const groups = await prisma.group.findMany({
        where: {
          title: {
            contains: query,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return groups
    }

    const groups = await prisma.group.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return groups
  }
}

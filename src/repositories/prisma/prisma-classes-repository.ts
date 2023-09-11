import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ClassesRepository } from '../classes-repository'

export class PrismaClassesRepository implements ClassesRepository {
  async create(data: Prisma.ClassCreateInput) {
    const classObject = await prisma.class.create({
      data,
    })

    return classObject
  }

  async findById(id: string) {
    const classObject = await prisma.class.findUnique({
      where: {
        id,
      },
    })

    return classObject
  }

  async searchMany(query: string | null, page: number) {
    if (query) {
      const classes = await prisma.class.findMany({
        where: {
          title: {
            contains: query,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return classes
    }

    const classes = await prisma.class.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return classes
  }
}

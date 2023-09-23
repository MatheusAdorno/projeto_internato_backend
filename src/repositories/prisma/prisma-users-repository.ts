import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async searchMany(name: string | null, page: number) {
    if (name) {
      const users = await prisma.user.findMany({
        where: {
          name: {
            contains: name,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return users
    }

    const users = await prisma.user.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return users
  }

  async searchManyPreceptors(name: string | null, page: number) {
    if (name) {
      const users = await prisma.user.findMany({
        where: {
          name: {
            contains: name,
          },
          role: {
            in: ['PRECEPTOR'],
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return users
    }

    const users = await prisma.user.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return users
  }
}

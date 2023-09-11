import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ActivityImplementationsRepository } from '../activity-implementations-repository'

export class PrismaActivityImplementationsRepository
  implements ActivityImplementationsRepository
{
  async create(data: Prisma.ActivityImplementationUncheckedCreateInput) {
    const activityImplementation = await prisma.activityImplementation.create({
      data,
    })

    return activityImplementation
  }

  async findById(id: string) {
    const activityImplementation =
      await prisma.activityImplementation.findUnique({
        where: {
          id,
        },
      })

    return activityImplementation
  }

  // async searchMany(query: string | null, page: number) {
  //   if (query) {
  //     const activityImplementations =
  //       await prisma.activityImplementation.findMany({
  //         where: {
  //           title: {
  //             contains: query,
  //           },
  //         },
  //         take: 20,
  //         skip: (page - 1) * 20,
  //       })
  //     return activityImplementations
  //   }

  //   const activityImplementations =
  //     await prisma.activityImplementation.findMany({
  //       take: 20,
  //       skip: (page - 1) * 20,
  //     })
  //   return activityImplementations
  // }
}

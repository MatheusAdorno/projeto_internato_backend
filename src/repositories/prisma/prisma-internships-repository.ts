import { Prisma } from '@prisma/client'
import { InternshipsRepository } from '../internships-repostitory'
import { prisma } from '@/lib/prisma'

export class PrismaInternshipsRepository implements InternshipsRepository {
  async create(data: Prisma.InternshipUncheckedCreateInput) {
    const internship = await prisma.internship.create({
      data,
    })

    return internship
  }

  async findById(id: string) {
    const internship = await prisma.internship.findUnique({
      where: {
        id,
      },
    })

    return internship
  }

  async searchMany(
    query: string | null,
    page: number,
    hospitalId: string | null,
    userInternshipIds: string[] | null,
  ) {
    if (query && hospitalId && userInternshipIds) {
      const internships = await prisma.internship.findMany({
        where: {
          title: {
            contains: query,
          },
          hospital_id: hospitalId,
          id: {
            in: userInternshipIds,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return internships
    }

    if (query && hospitalId) {
      const internships = await prisma.internship.findMany({
        where: {
          title: {
            contains: query,
          },
          hospital_id: hospitalId,
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return internships
    }

    if (query && userInternshipIds) {
      const internships = await prisma.internship.findMany({
        where: {
          title: {
            contains: query,
          },
          id: {
            in: userInternshipIds,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return internships
    }

    if (hospitalId && userInternshipIds) {
      const internships = await prisma.internship.findMany({
        where: {
          hospital_id: hospitalId,
          id: {
            in: userInternshipIds,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return internships
    }

    if (query) {
      const internships = await prisma.internship.findMany({
        where: {
          title: {
            contains: query,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return internships
    }

    if (hospitalId) {
      const internships = await prisma.internship.findMany({
        where: {
          hospital_id: hospitalId,
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return internships
    }

    if (userInternshipIds) {
      const internships = await prisma.internship.findMany({
        where: {
          id: {
            in: userInternshipIds,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return internships
    }

    const internships = await prisma.internship.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return internships
  }
}

import { Prisma } from '@prisma/client'
import { HospitalsRepository } from '../hospitals-repository'
import { prisma } from '@/lib/prisma'

export class PrismaHospitalsRepository implements HospitalsRepository {
  async create(data: Prisma.HospitalCreateInput) {
    const hospital = await prisma.hospital.create({
      data,
    })

    return hospital
  }

  async findById(id: string) {
    const hospital = await prisma.hospital.findUnique({
      where: {
        id,
      },
    })

    return hospital
  }

  async searchMany(query: string | null, page: number) {
    if (query) {
      const hospitals = await prisma.hospital.findMany({
        where: {
          name: {
            contains: query,
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      })
      return hospitals
    }

    const hospitals = await prisma.hospital.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return hospitals
  }
}

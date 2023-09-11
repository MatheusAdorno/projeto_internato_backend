import { Internship, Prisma } from '@prisma/client'
import { InternshipsRepository } from '../internships-repostitory'
import { randomUUID } from 'crypto'

export class InMemoryInternshipsRepository implements InternshipsRepository {
  public items: Internship[] = []

  async create(data: Prisma.InternshipUncheckedCreateInput) {
    const internship = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      hospital_id: data.hospital_id,
      
    }

    this.items.push(internship)

    return internship
  }

  async findById(id: string) {
    const internship = this.items.find((item) => item.id === id)

    if (!internship) {
      return null
    }

    return internship
  }

  async searchMany(
    query: string,
    page: number,
    hospitalId: string,
    userInternshipIds: string[],
  ) {
    // TODO: Create functionalities to all 3 params and 2-2 params
    if (query && hospitalId) {
      return this.items
        .filter((items) => items.title.includes(query))
        .filter((items) => items.hospital_id.includes(hospitalId))
        .slice((page - 1) * 20, page * 20)
    }

    if (query) {
      return this.items
        .filter((items) => items.title.includes(query))
        .slice((page - 1) * 20, page * 20)
    }

    if (hospitalId) {
      return this.items
        .filter((items) => items.hospital_id.includes(hospitalId))
        .slice((page - 1) * 20, page * 20)
    }

    if (userInternshipIds) {
      const internships = []

      for (let i = 0; i <= userInternshipIds.length; i++) {
        const internship = await this.findById(userInternshipIds[i])

        if (internship) {
          internships.push(internship)
        }
      }

      return internships.slice((page - 1) * 20, page * 20)
    }

    return this.items.slice((page - 1) * 20, page * 20)
  }
}

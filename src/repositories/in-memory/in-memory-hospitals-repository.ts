import { Hospital, Prisma } from '@prisma/client'
import { HospitalsRepository } from '../hospitals-repository'
import { randomUUID } from 'crypto'

export class InMemoryHospitalsRepository implements HospitalsRepository {
  public items: Hospital[] = []

  async create(data: Prisma.HospitalCreateInput): Promise<Hospital> {
    const hospital = {
      id: data.id ?? randomUUID(),
      name: data.name,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(hospital)

    return hospital
  }

  async findById(id: string) {
    const hospital = this.items.find((item) => item.id === id)

    if (!hospital) {
      return null
    }

    return hospital
  }

  async searchMany(query: string, page: number) {
    if (query) {
      return this.items
        .filter((items) => items.name.includes(query))
        .slice((page - 1) * 20, page * 20)
    }

    return this.items.slice((page - 1) * 20, page * 20)
  }
}

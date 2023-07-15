import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryHospitalsRepository } from '@/repositories/in-memory/in-memory-hospitals-repository'
import { CreateHospitalService } from './create-hospital'

let hospitalsRepository: InMemoryHospitalsRepository
let sut: CreateHospitalService

describe('Create Hospital Service', () => {
  beforeEach(() => {
    hospitalsRepository = new InMemoryHospitalsRepository()
    sut = new CreateHospitalService(hospitalsRepository)
  })

  it('should be able to create a hospital', async () => {
    const { hospital } = await sut.execute({
      name: 'Einstein',
      latitude: -23.5999746,
      longitude: -46.7178322,
    })

    expect(hospital.id).toEqual(expect.any(String))
  })
})

import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryHospitalsRepository } from '@/repositories/in-memory/in-memory-hospitals-repository'
import { SearchHospitalsService } from './search-hospitals'

let hospitalsRepository: InMemoryHospitalsRepository
let sut: SearchHospitalsService

describe('Search Hospitals Service', () => {
  beforeEach(async () => {
    hospitalsRepository = new InMemoryHospitalsRepository()
    sut = new SearchHospitalsService(hospitalsRepository)
  })

  it('should be able to search for hospitals registered', async () => {
    await hospitalsRepository.create({
      name: 'Einstein',
      latitude: -23.5999746,
      longitude: -46.7178322,
    })

    await hospitalsRepository.create({
      name: 'Hospital das Clínicas',
      latitude: -23.5577989,
      longitude: -46.6724347,
    })

    const { hospitals } = await sut.execute({
      query: '',
      page: 1,
    })

    expect(hospitals).toHaveLength(2)
    expect(hospitals).toEqual([
      expect.objectContaining({ name: 'Einstein' }),
      expect.objectContaining({ name: 'Hospital das Clínicas' }),
    ])
  })

  it('should be able to search for hospitals by name', async () => {
    await hospitalsRepository.create({
      name: 'Einstein',
      latitude: -23.5999746,
      longitude: -46.7178322,
    })

    await hospitalsRepository.create({
      name: 'Hospital das Clínicas',
      latitude: -23.5577989,
      longitude: -46.6724347,
    })

    const { hospitals } = await sut.execute({
      query: 'Einstein',
      page: 1,
    })

    expect(hospitals).toHaveLength(1)
    expect(hospitals).toEqual([expect.objectContaining({ name: 'Einstein' })])
  })

  it('should be able to fetch paginated hospital search', async () => {
    for (let i = 1; i <= 22; i++) {
      await hospitalsRepository.create({
        name: `Einstein - ${i}`,
        latitude: -23.5999746,
        longitude: -46.7178322,
      })
    }

    const { hospitals } = await sut.execute({
      query: 'Einstein',
      page: 2,
    })

    expect(hospitals).toHaveLength(2)
    expect(hospitals).toEqual([
      expect.objectContaining({ name: 'Einstein - 21' }),
      expect.objectContaining({ name: 'Einstein - 22' }),
    ])
  })
})

import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryInternshipsRepository } from '@/repositories/in-memory/in-memory-internships-repository'
import { SearchInternshipsService } from './search-internships'
import { InMemoryUserInternshipConexionsRepository } from '@/repositories/in-memory/in-memory-user-internship-conexions-repository'

let internshipsRepository: InMemoryInternshipsRepository
let userInternshipConexionsRepository: InMemoryUserInternshipConexionsRepository
let sut: SearchInternshipsService

describe('Search Internships Service', () => {
  beforeEach(async () => {
    internshipsRepository = new InMemoryInternshipsRepository()
    userInternshipConexionsRepository =
      new InMemoryUserInternshipConexionsRepository()
    sut = new SearchInternshipsService(
      internshipsRepository,
      userInternshipConexionsRepository,
    )

    await internshipsRepository.create({
      title: 'Clínica Médica',
      description: '',
      hospital_id: 'hospital-01',
    })

    await internshipsRepository.create({
      title: 'Cirurgia Geral',
      description: '',
      hospital_id: 'hospital-02',
    })
  })

  it('should be able to search for internships registered', async () => {
    const { internships } = await sut.execute({
      query: '',
      page: 1,
      hospitalId: '',
      userId: '',
    })

    expect(internships).toHaveLength(2)
    expect(internships).toEqual([
      expect.objectContaining({ title: 'Clínica Médica' }),
      expect.objectContaining({ title: 'Cirurgia Geral' }),
    ])
  })

  it('should be able to search for internships by name', async () => {
    const { internships } = await sut.execute({
      query: 'Clínica Médica',
      page: 1,
      hospitalId: '',
      userId: '',
    })

    expect(internships).toHaveLength(1)
    expect(internships).toEqual([
      expect.objectContaining({ title: 'Clínica Médica' }),
    ])
  })

  it('should be able to search for internships by hospital', async () => {
    const { internships } = await sut.execute({
      query: '',
      page: 1,
      hospitalId: 'hospital-01',
      userId: '',
    })

    expect(internships).toHaveLength(1)
    expect(internships).toEqual([
      expect.objectContaining({ title: 'Clínica Médica' }),
    ])
  })

  it('should be able to search for internships by name and hospital', async () => {
    await internshipsRepository.create({
      title: 'Clínica Médica',
      description: '',
      hospital_id: 'hospital-02',
    })

    const { internships } = await sut.execute({
      query: 'Clínica Médica',
      page: 1,
      hospitalId: 'hospital-01',
      userId: '',
    })

    expect(internships).toHaveLength(1)
    expect(internships).toEqual([
      expect.objectContaining({ title: 'Clínica Médica' }),
    ])
  })

  it('should be able to search for internships by user', async () => {
    const internship = await internshipsRepository.create({
      title: 'Clínica Médica',
      description: '',
      hospital_id: 'hospital-01',
    })

    await userInternshipConexionsRepository.create({
      internship_id: internship.id,
      user_id: 'user-01',
    })

    const { internships } = await sut.execute({
      query: '',
      page: 1,
      hospitalId: '',
      userId: 'user-01',
    })

    expect(internships).toHaveLength(1)
    expect(internships).toEqual([
      expect.objectContaining({ title: 'Clínica Médica' }),
    ])
  })

  it('should be able to fetch paginated internships search', async () => {
    for (let i = 1; i <= 22; i++) {
      await internshipsRepository.create({
        title: `Clínica Médica - ${i}`,
        description: '',
        hospital_id: 'hospital-01',
      })
    }

    const { internships } = await sut.execute({
      query: 'Clínica Médica',
      page: 2,
      hospitalId: '',
      userId: '',
    })

    expect(internships).toHaveLength(3)
    expect(internships).toEqual([
      expect.objectContaining({ title: 'Clínica Médica - 20' }),
      expect.objectContaining({ title: 'Clínica Médica - 21' }),
      expect.objectContaining({ title: 'Clínica Médica - 22' }),
    ])
  })
})

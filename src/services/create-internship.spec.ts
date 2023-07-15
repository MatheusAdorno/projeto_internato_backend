import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryInternshipsRepository } from '@/repositories/in-memory/in-memory-internships-repository'
import { CreateInternshipService } from './create-internship'
import { InMemoryUserInternshipConexionsRepository } from '@/repositories/in-memory/in-memory-user-internship-conexions-repository'

let internshipsRepository: InMemoryInternshipsRepository
let userInternshipConexionsRepository: InMemoryUserInternshipConexionsRepository
let sut: CreateInternshipService

describe('Create Internship Service', () => {
  beforeEach(() => {
    internshipsRepository = new InMemoryInternshipsRepository()
    userInternshipConexionsRepository =
      new InMemoryUserInternshipConexionsRepository()
    sut = new CreateInternshipService(
      internshipsRepository,
      userInternshipConexionsRepository,
    )
  })

  it('should be able to create an internship', async () => {
    const { internship } = await sut.execute({
      title: 'Clínica Médica',
      description: null,
      hospital_id: 'hospital-1',
      user_id: '123',
    })

    expect(internship.id).toEqual(expect.any(String))
  })

  it('should be able to create a conexion when an internship is created', async () => {
    await sut.execute({
      title: 'Clínica Médica',
      description: null,
      hospital_id: 'hospital-1',
      user_id: '123',
    })

    const internship =
      await userInternshipConexionsRepository.findInternshipByUserId('123')

    expect(internship).toHaveLength(1)
  })
})

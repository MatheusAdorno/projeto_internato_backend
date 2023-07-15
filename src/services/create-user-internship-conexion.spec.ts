import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUserInternshipConexionsRepository } from '@/repositories/in-memory/in-memory-user-internship-conexions-repository'
import { CreateUserInternshipConexionService } from './create-user-internship-conexion'

let userInternshipConexionsRepository: InMemoryUserInternshipConexionsRepository
let sut: CreateUserInternshipConexionService

describe('Create User Internship Conexion Service', () => {
  beforeEach(() => {
    userInternshipConexionsRepository =
      new InMemoryUserInternshipConexionsRepository()
    sut = new CreateUserInternshipConexionService(
      userInternshipConexionsRepository,
    )
  })

  it('should be able to create a conexion between an user and an internship', async () => {
    const { userInternshipConexion } = await sut.execute({
      userId: 'user-01',
      internshipId: 'internship-01',
    })

    expect(userInternshipConexion.user_id).toEqual(expect.any(String))
    expect(userInternshipConexion.internship_id).toEqual(expect.any(String))
  })

  it('should be able to find an internship conexion by user_id', async () => {
    await sut.execute({
      userId: 'user-01',
      internshipId: 'internship-01',
    })

    await sut.execute({
      userId: 'user-01',
      internshipId: 'internship-02',
    })

    await sut.execute({
      userId: 'user-02',
      internshipId: 'internship-03',
    })

    const internships =
      await userInternshipConexionsRepository.findInternshipByUserId('user-01')

    expect(internships).toHaveLength(2)
    expect(internships).toEqual(['internship-01', 'internship-02'])
  })
})

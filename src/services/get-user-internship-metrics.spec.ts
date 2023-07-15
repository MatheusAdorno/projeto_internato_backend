import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserInternshipMetricsService } from './get-user-internship-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserInternshipMetricsService

describe('Get User Internship Metrics Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserInternshipMetricsService(checkInsRepository)
  })

  it('should be able to get chek-in count in an internship from metrics', async () => {
    await checkInsRepository.create({
      internship_id: 'internship-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      internship_id: 'internship-01',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
      internshipId: 'internship-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})

import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from './check-in'
import { InMemoryInternshipsRepository } from '@/repositories/in-memory/in-memory-internships-repository'
import { InMemoryHospitalsRepository } from '@/repositories/in-memory/in-memory-hospitals-repository'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let internshipsRepository: InMemoryInternshipsRepository
let hospitalsRepository: InMemoryHospitalsRepository
let sut: CheckInService

describe('CheckIn Service', () => {
  beforeEach(async () => {
    hospitalsRepository = new InMemoryHospitalsRepository()

    checkInsRepository = new InMemoryCheckInsRepository()
    internshipsRepository = new InMemoryInternshipsRepository()
    sut = new CheckInService(
      checkInsRepository,
      internshipsRepository,
      hospitalsRepository,
    )

    const hospital = await hospitalsRepository.create({
      id: 'hospital-01',
      name: 'Einstein',
      latitude: -23.5999746,
      longitude: -46.7178322,
    })

    await internshipsRepository.create({
      id: 'internship-01',
      hospital_id: hospital.id,
      title: 'Estágio de Clínica Médica',
      description: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      internshipId: 'internship-01',
      userId: 'user-01',
      userLatitude: -23.5999746,
      userLongitude: -46.7178322,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      internshipId: 'internship-01',
      userId: 'user-01',
      userLatitude: -23.5999746,
      userLongitude: -46.7178322,
    })

    await expect(() =>
      sut.execute({
        internshipId: 'internship-01',
        userId: 'user-01',
        userLatitude: -23.5999746,
        userLongitude: -46.7178322,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in defferent days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      internshipId: 'internship-01',
      userId: 'user-01',
      userLatitude: -23.5999746,
      userLongitude: -46.7178322,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      internshipId: 'internship-01',
      userId: 'user-01',
      userLatitude: -23.5999746,
      userLongitude: -46.7178322,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant internship', async () => {
    internshipsRepository.items.push({
      id: 'internship-02',
      hospital_id: 'hospital-01',
      title: 'Einstein',
      description: '',
    })

    await expect(() =>
      sut.execute({
        internshipId: 'internship-02',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})

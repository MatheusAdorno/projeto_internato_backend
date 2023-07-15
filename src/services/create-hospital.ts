import { Hospital } from '@prisma/client'
import { HospitalsRepository } from '@/repositories/hospitals-repository'

interface CreateHospitalServiceRequest {
  name: string
  latitude: number
  longitude: number
}

interface CreateHospitalServiceResponse {
  hospital: Hospital
}

export class CreateHospitalService {
  constructor(private hospitalsRepository: HospitalsRepository) {}

  async execute({
    name,
    latitude,
    longitude,
  }: CreateHospitalServiceRequest): Promise<CreateHospitalServiceResponse> {
    const hospital = await this.hospitalsRepository.create({
      name,
      latitude,
      longitude,
    })

    return {
      hospital,
    }
  }
}

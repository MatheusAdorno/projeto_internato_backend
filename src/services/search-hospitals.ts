import { Hospital } from '@prisma/client'
import { HospitalsRepository } from '@/repositories/hospitals-repository'

interface SearchHospitalsServiceRequest {
  query: string
  page: number
}

interface SearchHospitalsServiceResponse {
  hospitals: Hospital[]
}

export class SearchHospitalsService {
  constructor(private hospitalsRepository: HospitalsRepository) {}

  async execute({
    query,
    page,
  }: SearchHospitalsServiceRequest): Promise<SearchHospitalsServiceResponse> {
    const hospitals = await this.hospitalsRepository.searchMany(query, page)

    return {
      hospitals,
    }
  }
}

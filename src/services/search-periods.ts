import { Period } from '@prisma/client'
import { PeriodsRepository } from '@/repositories/periods-repository'

interface SearchPeriodsServiceRequest {
  query: string
  page: number
}

interface SearchPeriodsServiceResponse {
  periods: Period[]
}

export class SearchPeriodsService {
  constructor(private PeriodsRepository: PeriodsRepository) {}

  async execute({
    query,
    page,
  }: SearchPeriodsServiceRequest): Promise<SearchPeriodsServiceResponse> {
    const periods = await this.PeriodsRepository.searchMany(query, page)

    return {
      periods,
    }
  }
}

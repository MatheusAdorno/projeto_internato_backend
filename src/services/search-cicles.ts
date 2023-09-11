import { Cicle } from '@prisma/client'
import { CiclesRepository } from '@/repositories/cicles-repository'

interface SearchCiclesServiceRequest {
  query: string
  page: number
}

interface SearchCiclesServiceResponse {
  cicles: Cicle[]
}

export class SearchCiclesService {
  constructor(private ciclesRepository: CiclesRepository) {}

  async execute({
    query,
    page,
  }: SearchCiclesServiceRequest): Promise<SearchCiclesServiceResponse> {
    const cicles = await this.ciclesRepository.searchMany(query, page)

    return {
      cicles,
    }
  }
}

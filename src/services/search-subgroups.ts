import { Subgroup } from '@prisma/client'
import { SubgroupsRepository } from '@/repositories/subgroups-repository'

interface SearchSubgroupsServiceRequest {
  query: string
  page: number
}

interface SearchSubgroupsServiceResponse {
  subgroups: Subgroup[]
}

export class SearchSubgroupsService {
  constructor(private SubgroupsRepository: SubgroupsRepository) {}

  async execute({
    query,
    page,
  }: SearchSubgroupsServiceRequest): Promise<SearchSubgroupsServiceResponse> {
    const subgroups = await this.SubgroupsRepository.searchMany(query, page)

    return {
      subgroups,
    }
  }
}

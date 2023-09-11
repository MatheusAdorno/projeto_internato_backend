import { Group } from '@prisma/client'
import { GroupsRepository } from '@/repositories/groups-repository'

interface SearchGroupsServiceRequest {
  query: string
  page: number
}

interface SearchGroupsServiceResponse {
  groups: Group[]
}

export class SearchGroupsService {
  constructor(private groupsRepository: GroupsRepository) {}

  async execute({
    query,
    page,
  }: SearchGroupsServiceRequest): Promise<SearchGroupsServiceResponse> {
    const groups = await this.groupsRepository.searchMany(query, page)

    return {
      groups,
    }
  }
}

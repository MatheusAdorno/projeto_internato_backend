import { Activity } from '@prisma/client'
import { ActivitiesRepository } from '@/repositories/activities-repository'

interface SearchActivitiesServiceRequest {
  query: string
  page: number
}

interface SearchActivitiesServiceResponse {
  activities: Activity[]
}

export class SearchActivitiesService {
  constructor(private activitiesRepository: ActivitiesRepository) {}

  async execute({
    query,
    page,
  }: SearchActivitiesServiceRequest): Promise<SearchActivitiesServiceResponse> {
    const activities = await this.activitiesRepository.searchMany(query, page)

    return {
      activities,
    }
  }
}

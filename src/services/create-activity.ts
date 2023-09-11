import { Activity } from '@prisma/client'
import { ActivitiesRepository } from '@/repositories/activities-repository'

interface CreateActivityServiceRequest {
  title: string
  description: string
}

interface CreateActivityServiceResponse {
  activity: Activity
}

export class CreateActivityService {
  constructor(private activitiesRepository: ActivitiesRepository) {}

  async execute({
    title,
    description,
  }: CreateActivityServiceRequest): Promise<CreateActivityServiceResponse> {
    const activity = await this.activitiesRepository.create({
      title,
      description,
    })

    return {
      activity,
    }
  }
}

import { ActivityImplementation } from '@prisma/client'
import { ActivityImplementationsRepository } from '@/repositories/activity-implementations-repository'

interface CreateActivityImplementationServiceRequest {
  activity_id: string
  dateStart: Date
  dateEnd: Date
  hourStart: Date
  hourEnd: Date
  user_id: string
  internship_id: string
  hospital_id: string
  hospitalArea_id: string
  preceptor_id: string
}

interface CreateActivityImplementationServiceResponse {
  activityImplementation: ActivityImplementation
}

export class CreateActivityImplementationService {
  constructor(
    private activityImplementationsRepository: ActivityImplementationsRepository,
  ) {}

  async execute({
    activity_id,
    dateStart,
    dateEnd,
    hourStart,
    hourEnd,
    user_id,
    internship_id,
    hospital_id,
    hospitalArea_id,
    preceptor_id,
  }: CreateActivityImplementationServiceRequest): Promise<CreateActivityImplementationServiceResponse> {
    const activityImplementation =
      await this.activityImplementationsRepository.create({
        activity_id,
        dateStart,
        dateEnd,
        hourStart,
        hourEnd,
        user_id,
        internship_id,
        hospital_id,
        hospitalArea_id,
        preceptor_id,
      })

    return {
      activityImplementation,
    }
  }
}

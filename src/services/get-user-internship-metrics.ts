import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserInternshipMetricsServiceRequest {
  userId: string
  internshipId: string
}

interface GetUserInternshipMetricsServiceResponse {
  checkInsCount: number
}

export class GetUserInternshipMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    internshipId,
  }: GetUserInternshipMetricsServiceRequest): Promise<GetUserInternshipMetricsServiceResponse> {
    const checkInsCount =
      await this.checkInsRepository.countByUserIdAndInternshipId(
        userId,
        internshipId,
      )

    return {
      checkInsCount,
    }
  }
}

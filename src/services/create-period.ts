import { Period } from '@prisma/client'
import { PeriodsRepository } from '@/repositories/periods-repository'

interface CreatePeriodServiceRequest {
  title: string
  description: string
}

interface CreatePeriodServiceResponse {
  period: Period
}

export class CreatePeriodService {
  constructor(private periodsRepository: PeriodsRepository) {}

  async execute({
    title,
    description,
  }: CreatePeriodServiceRequest): Promise<CreatePeriodServiceResponse> {
    const period = await this.periodsRepository.create({
      title,
      description,
    })

    return {
      period,
    }
  }
}

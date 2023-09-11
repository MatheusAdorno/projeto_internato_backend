import { Cicle } from '@prisma/client'
import { CiclesRepository } from '@/repositories/cicles-repository'

interface CreateCicleServiceRequest {
  title: string
  description: string
}

interface CreateCicleServiceResponse {
  cicle: Cicle
}

export class CreateCicleService {
  constructor(private ciclesRepository: CiclesRepository) {}

  async execute({
    title,
    description,
  }: CreateCicleServiceRequest): Promise<CreateCicleServiceResponse> {
    const cicle = await this.ciclesRepository.create({
      title,
      description,
    })

    return {
      cicle,
    }
  }
}

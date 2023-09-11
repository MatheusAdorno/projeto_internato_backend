import { Subgroup } from '@prisma/client'
import { SubgroupsRepository } from '@/repositories/subgroups-repository'

interface CreateSubgroupServiceRequest {
  title: string
  description: string
}

interface CreateSubgroupServiceResponse {
  subgroup: Subgroup
}

export class CreateSubgroupService {
  constructor(private subgroupsRepository: SubgroupsRepository) {}

  async execute({
    title,
    description,
  }: CreateSubgroupServiceRequest): Promise<CreateSubgroupServiceResponse> {
    const subgroup = await this.subgroupsRepository.create({
      title,
      description,
    })

    return {
      subgroup,
    }
  }
}

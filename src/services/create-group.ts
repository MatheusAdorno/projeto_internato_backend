import { Group } from '@prisma/client'
import { GroupsRepository } from '@/repositories/groups-repository'

interface CreateGroupServiceRequest {
  title: string
  description: string
  class_id: string
}

interface CreateGroupServiceResponse {
  group: Group
}

export class CreateGroupService {
  constructor(private groupsRepository: GroupsRepository) {}

  async execute({
    title,
    description,
  }: CreateGroupServiceRequest): Promise<CreateGroupServiceResponse> {
    const group = await this.groupsRepository.create({
      title,
      description,
    })

    return {
      group,
    }
  }
}

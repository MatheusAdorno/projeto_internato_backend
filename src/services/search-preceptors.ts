import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'

interface SearchPreceptorsServiceRequest {
  name: string
  page: number
}

interface SearchPreceptorsServiceResponse {
  users: User[]
}

export class SearchPreceptorsService {
  constructor(private UsersRepository: UsersRepository) {}

  async execute({
    name,
    page,
  }: SearchPreceptorsServiceRequest): Promise<SearchPreceptorsServiceResponse> {
    const users = await this.UsersRepository.searchManyPreceptors(name, page)

    return {
      users,
    }
  }
}

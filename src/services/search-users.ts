import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'

interface SearchUsersServiceRequest {
  name: string
  page: number
}

interface SearchUsersServiceResponse {
  users: User[]
}

export class SearchUsersService {
  constructor(private UsersRepository: UsersRepository) {}

  async execute({
    name,
    page,
  }: SearchUsersServiceRequest): Promise<SearchUsersServiceResponse> {
    const users = await this.UsersRepository.searchMany(name, page)

    return {
      users,
    }
  }
}

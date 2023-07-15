import { Internship } from '@prisma/client'
import { InternshipsRepository } from '@/repositories/internships-repostitory'
import { UserInternshipConexionsRepository } from '@/repositories/user-internship-conexion-repository'

interface SearchInternshipsServiceRequest {
  query: string
  page: number
  hospitalId: string
  userId: string
}

interface SearchInternshipsServiceResponse {
  internships: Internship[]
}

export class SearchInternshipsService {
  constructor(
    private internshipsRepository: InternshipsRepository,
    private userInternshipConexionsRepository: UserInternshipConexionsRepository,
  ) {}

  async execute({
    query,
    page,
    hospitalId,
    userId,
  }: SearchInternshipsServiceRequest): Promise<SearchInternshipsServiceResponse> {
    let userInternshipIds = null

    if (userId) {
      userInternshipIds =
        await this.userInternshipConexionsRepository.findInternshipByUserId(
          userId,
        )
    }

    const internships = await this.internshipsRepository.searchMany(
      query,
      page,
      hospitalId,
      userInternshipIds,
    )

    return {
      internships,
    }
  }
}

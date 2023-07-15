import { UserInternshipConexion } from '@prisma/client'
import { UserInternshipConexionsRepository } from '@/repositories/user-internship-conexion-repository'

interface CreateUserInternshipConexionServiceRequest {
  userId: string
  internshipId: string
}

interface CreateUserInternshipConexionServiceResponse {
  userInternshipConexion: UserInternshipConexion
}

export class CreateUserInternshipConexionService {
  constructor(
    private userInternshipConexionsRepository: UserInternshipConexionsRepository,
  ) {}

  async execute({
    userId,
    internshipId,
  }: CreateUserInternshipConexionServiceRequest): Promise<CreateUserInternshipConexionServiceResponse> {
    const userInternshipConexion =
      await this.userInternshipConexionsRepository.create({
        user_id: userId,
        internship_id: internshipId,
      })

    return {
      userInternshipConexion,
    }
  }
}

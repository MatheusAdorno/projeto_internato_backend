import { Internship } from '@prisma/client'
import { InternshipsRepository } from '@/repositories/internships-repostitory'
import { UserInternshipConexionsRepository } from '@/repositories/user-internship-conexion-repository'

interface CreateInternshipServiceRequest {
  title: string
  description: string | null
  hospital_id: string
  user_id: string
  cicle_id: string
  hospitalArea_id: string
  period_id: string
  preceptor_id: string | null
}

interface CreateInternshipServiceResponse {
  internship: Internship
}

export class CreateInternshipService {
  constructor(
    private internshipsRepository: InternshipsRepository,
    private userInternshipConexionRepository: UserInternshipConexionsRepository,
  ) {}

  async execute({
    title,
    description,
    hospital_id,
    user_id,
    cicle_id,
    hospitalArea_id,
    period_id,
    preceptor_id,
  }: CreateInternshipServiceRequest): Promise<CreateInternshipServiceResponse> {
    const internship = await this.internshipsRepository.create({
      title,
      description,
      hospital_id,
      cicle_id,
      hospitalArea_id,
      period_id,
      preceptor_id,
    })

    const internshipId = internship.id

    await this.userInternshipConexionRepository.create({
      user_id,
      internship_id: internshipId,
    })

    return {
      internship,
    }
  }
}

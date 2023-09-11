import { Class } from '@prisma/client'
import { ClassesRepository } from '@/repositories/classes-repository'

interface CreateClassServiceRequest {
  title: string
  description: string
}

interface CreateClassServiceResponse {
  classObject: Class
}

export class CreateClassService {
  constructor(private classesRepository: ClassesRepository) {}

  async execute({
    title,
    description,
  }: CreateClassServiceRequest): Promise<CreateClassServiceResponse> {
    const classObject = await this.classesRepository.create({
      title,
      description,
    })

    return {
      classObject,
    }
  }
}

import { Class } from '@prisma/client'
import { ClassesRepository } from '@/repositories/classes-repository'

interface SearchClassesServiceRequest {
  query: string
  page: number
}

interface SearchClassesServiceResponse {
  classes: Class[]
}

export class SearchClassesService {
  constructor(private classesRepository: ClassesRepository) {}

  async execute({
    query,
    page,
  }: SearchClassesServiceRequest): Promise<SearchClassesServiceResponse> {
    const classes = await this.classesRepository.searchMany(query, page)

    return {
      classes,
    }
  }
}

import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  searchMany(name: string | null, page: number): Promise<User[]>
  searchManyPreceptors(name: string | null, page: number): Promise<User[]>
  create(data: Prisma.UserCreateInput): Promise<User>
}

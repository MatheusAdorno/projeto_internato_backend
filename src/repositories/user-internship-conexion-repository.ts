import { Prisma, UserInternshipConexion } from '@prisma/client'

export interface UserInternshipConexionsRepository {
  create(
    data: Prisma.UserInternshipConexionUncheckedCreateInput,
  ): Promise<UserInternshipConexion>
  findInternshipByUserId(user_id: string): Promise<string[] | null>
}

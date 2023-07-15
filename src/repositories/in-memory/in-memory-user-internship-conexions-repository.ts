import { Prisma, UserInternshipConexion } from '@prisma/client'
import { UserInternshipConexionsRepository } from '../user-internship-conexion-repository'

export class InMemoryUserInternshipConexionsRepository
  implements UserInternshipConexionsRepository
{
  public items: UserInternshipConexion[] = []

  async create(data: Prisma.UserInternshipConexionUncheckedCreateInput) {
    const userInternshipConexion = {
      user_id: data.user_id,
      internship_id: data.internship_id,
      created_at: new Date(),
    }

    this.items.push(userInternshipConexion)

    return userInternshipConexion
  }

  async findInternshipByUserId(user_id: string) {
    const internshipsId = this.items
      .filter((item) => item.user_id === user_id)
      .map((item) => item.internship_id)

    if (!internshipsId) {
      return null
    }

    return internshipsId
  }
}

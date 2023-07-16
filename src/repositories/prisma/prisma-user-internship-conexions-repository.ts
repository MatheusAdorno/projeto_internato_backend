import { Prisma } from '@prisma/client'
import { UserInternshipConexionsRepository } from '../user-internship-conexion-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUserInternshipConexionsRepository
  implements UserInternshipConexionsRepository
{
  async create(data: Prisma.UserInternshipConexionUncheckedCreateInput) {
    const userInternshipConexion = await prisma.userInternshipConexion.create({
      data,
    })

    return userInternshipConexion
  }

  async findInternshipByUserId(user_id: string) {
    const userInternshipConexionArrayList =
      await prisma.userInternshipConexion.findMany({
        where: {
          user_id,
        },
        select: {
          internship_id: true,
        },
      })

    const userInternshipConexions = []

    for (let i = 0; i <= userInternshipConexionArrayList.length; i++) {
      userInternshipConexions.push(
        userInternshipConexionArrayList[i].internship_id,
      )
    }

    return userInternshipConexions
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from '@prisma/client'
import { User } from 'next-auth'

const prisma = new PrismaClient()

type ErrorResponse = {
  message: string
}

type LoginResponse = ErrorResponse | User

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
  ) {
    if (req.method !== 'POST') {
      return res.status(405).send({ message: 'Only POST request are allowed' })
    }
    
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          name: req.body.username,
          password: req.body.password 
        }
      })
      // @ts-ignore
      return res.status(200).json({...user})
    } catch (err) {
      console.log(err)
      return res.status(404).send({ message: 'User does not exist.'})
    }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

type ArduinoResponse = {
    message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArduinoResponse>
) {
    const { name, lat, lon } = req.query

    try {
        const report = await prisma.report.create({
            data: {
                name: name as string,
                latitude: parseFloat(lat as string),
                longitude: parseFloat(lon as string),
            }
        })
        
        return res.status(200).json({ message: 'Success!'})
    } catch (err) {

        console.log(err)
        return res.status(400).json({ message: 'Bad Request'})

    } finally {
        prisma.$disconnect()
    }

}
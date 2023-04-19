// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../live/prisma'

type ArduinoResponse = {
    message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArduinoResponse>
) {
    const { name, lat, lon } = req.query
    const latitude = parseFloat(lat as string)
    const longitude = parseFloat(lon as string)
    try {
        const report = await prisma.report.create({
            data: {
                name: name as string,
                latitude,
                longitude,
                link: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&zoom=14&markers=${latitude},${longitude}`
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
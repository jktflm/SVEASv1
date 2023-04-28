// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../live/prisma'

type ReportsResponse = {
    data?: any
    message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReportsResponse>
) {
    console.log('im here')
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed'})
    }
    try {
        const report = await prisma.report.update({
            where: {
                id: parseInt(req.body.id)
            },
            data: {
                status: req.body.status
            }
        })
        return res.status(200).json({ data: report, message: 'Success'})
    } catch (err) {
        console.log(err)
        return res.status(404).json({ message: 'Not found'})
    } 
  
}

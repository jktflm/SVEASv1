// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../live/prisma'




type ReportsResponse = {
    data?: any
    message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReportsResponse>
) {
    try {
        const reports = await prisma.report.findMany()
        console.log(reports)
        return res.status(200).json({ data: reports, message: 'Success'})
    } catch (err) {
        console.log(err)
        return res.status(404).json({ message: 'Not found'})
    } 
  
}

import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { report } from '@prisma/client'


export default function Home() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<report[]>([])

  useEffect(() => {
    (async function fetchReports() {
      try {
        const response = await axios.get('/api/reports');
        setData(response.data?.data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])
  
  
  if (status === 'authenticated') {
    return (
      <>
        <Head>
          <title>About - SVEAS</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <nav className='nav'>
            <ul className='nav-list'>
              <li><Link href='/'>Back</Link></li>
              <li className='nav-title'>Records of Accidents</li>
            </ul>
          </nav>
          <div className='flex'>
            <table className='flex-1 table-auto border m-8'>
              <thead>
                <tr>
                  <th className='border p-4'>Rescue ID</th>
                  <th className='border p-4'>Date</th>
                  <th className='border p-4'>Boat Operator</th>
                  <th className='border p-4'>Latitude</th>
                  <th className='border p-4'>Longitude</th>
                  <th className='border p-4'>Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((d, i) => (<tr key={i}>
                    <td className='border p-2'>{d.id}</td>
                    <td className='border p-2'>{String(d.timestamp)}</td>
                    <td className='border p-2'>{String(d.name)}</td>
                    <td className='border p-2'>{String(d.latitude)}</td>
                    <td className='border p-2'>{String(d.longitude)}</td>
                    <td className='border p-2'>{String(d.status)}</td>
                </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </>
      
    )
  }
}

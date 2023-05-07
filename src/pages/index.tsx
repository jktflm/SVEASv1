
import Head from 'next/head'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'

function MyMap() {
  // const map = useMap()
  // console.log('map center:', map.getCenter())
  // return null
}
export default function Home() {
  const { data: session, status } = useSession()
  
  const Map = useMemo( () => dynamic(
    () => import('../components/Map'),
    { 
      loading: () => <p>Map is Loading...</p>,
      ssr: false 
    }
  ), [])
  
  if (status === 'authenticated') {
    return (
      <>
        <Head>
          <title>Dashboard - SVEAS</title>
          <meta name="description" content="S.V.E.A.S. Website" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <nav className='nav'>
            <ul className='nav-list'>
              <li className='dashboard-title'><Link href='/'>Dashboard</Link></li>
              <li>{ session?.user?.name}</li>
              <li><Link href='/records'>Record of Accidents</Link></li>
              <li><Link href='/about'>About</Link></li>
              <li><a onClick={() => signOut()} style={{ cursor: 'pointer'}}>Logout</a></li>
            </ul>
          </nav>
          <Map />

        </div>
      </>
      
    )
  }

  return null


}

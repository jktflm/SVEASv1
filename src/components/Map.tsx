// @ts-check

import { MapContainer, Marker, Popup, TileLayer, useMap, } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';
import { Report } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

async function fetchReports(setData: Dispatch<SetStateAction<Report[]>>) {
  try {
    const response = await axios.get('/api/reports');
    setData(response.data?.data)
  } catch (err) {
    console.log(err)
  }
}

const MapData = () => {
  const map = useMap()
  
  useEffect(() => {
    (async function init() {
      // delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();

  }, [])
  return null
}

const Map = () => {
  const [data, setData] = useState<Report[]>([])
  const [lat, setLat] = useState<Decimal>()
  const [lng, setLng] = useState<Decimal>()
  const [zoom, setZoom] = useState(13)

  const onRescue = async ({id, status}: any) => {
    try {
      const response = await axios.post('api/reports/status/update', 
      { id, status },
      {
          headers: {
            'Content-Type': 'application/json'
          }
      })
      await fetchReports(setData)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchReports(setData)
  }, [])
  return (
    <>
    <MapContainer center={[12.6085, 122.0724]} zoom={zoom} scrollWheelZoom={true} style={{height: "90vh", width: "100%"}}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <MapData />
      {data && data.map((d, i) => (d.status === 'unrescued' || d.status === 'ongoing') && (
        <Marker key={i} position={{'lat': d.latitude, 'lng': d.longitude}}>
          <Popup>
            <div>
              <p>{d.name}</p>
              <p>{d.latitude}</p>
              <p>{d.longitude}</p>
              <p>{String(d.timestamp)}</p>
              { d.status == 'unrescued' && <button className='rounded-full bg-red-500 px-4 py-1 text-white' onClick={(e) => onRescue({id: d.id, status: 'ongoing'})}>Rescue</button>}
              { d.status === 'ongoing' && <button className='rounded-full bg-green-500 px-4 py-1 text-white' onClick={(e) => onRescue({id: d.id, status: 'rescued'})}>Resolve</button> }
            </div>
          </Popup>
      </Marker>)
      )}
    </MapContainer>
  </>
  )
}
  
export default Map;
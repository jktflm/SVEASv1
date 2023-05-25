// @ts-check

import { Circle, FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMap, } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';
import { report } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import moment from "moment";
import  Link from 'next/link'
import marker from "../styles/marker.svg"


async function fetchReports(setData: Dispatch<SetStateAction<report[]>>) {
  try {
    
    const response = await axios.get('/api/reports');
    const data = response.data?.data
    setData(data)
  } catch (err) {
    console.log(err)
  }
}
const chooseIcon = (color: "Unrescued"|"Ongoing") => {
  if (color == "Unrescued"){
    
    return L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      iconRetinaUrl: iconRetinaUrl.src,
      shadowUrl: shadowUrl.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }
  else if (color == "Ongoing"){
  return L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    iconRetinaUrl: iconRetinaUrl.src,
    shadowUrl: shadowUrl.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

}
const MapData = () => {
  const map = useMap()
  return null
}

const Map = () => {
  const [data, setData] = useState<report[]>([])
  const [lat, setLat] = useState<Decimal>()
  const [lng, setLng] = useState<Decimal>()
  const [zoom, setZoom] = useState(12)

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
    // setInterval(()=>{
    //   fetchReports(setData)
    //   console.log("hello")
    // },10000 )
    fetchReports(setData)
    
  }, [])
  console.log(data)
  return (
    <>
    <MapContainer center={[12.6085, 122.0724]} zoom={zoom} scrollWheelZoom={true} style={{height: "100vh", width: "100%"}}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <MapData />
      {data && data.map((d, i) => (d.status === 'Unrescued' || d.status === 'Ongoing') && (
        <div key={d.id}>
          <FeatureGroup pathOptions={{ color: 'blue', fillColor: 'blue' }}>
            <Marker icon = {chooseIcon(d.status)}  position={{'lat': d.latitude, 'lng': d.longitude}}>
              <Popup>
                <div>
                  <p className='map-marker'>Boat Operator: {d.name}</p>
                  <p className='map-marker'>Time Sent: {d.timesent}</p>
                  <p className='map-marker'>Latitude: {d.latitude}</p>
                  <p className='map-marker'>Longitude: {d.longitude}</p>
                  <p className='map-marker'>Date: {String(moment(d.timestamp).format('dddd MMM DD, YYYY hh:mm:ss'))}</p>
                    <div>
                  { d.status == 'Unrescued' && <button className='rounded-full bg-red-500 px-4 py-1 text-white' onClick={(e) => onRescue({id: d.id, status: 'Ongoing'})}>Rescue</button>}
                  { d.status === 'Ongoing' && <button className='rounded-full bg-green-500 px-4 py-1 text-white' onClick={(e) => onRescue({id: d.id, status: 'Rescued'})}>Resolve</button> }
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link href={d.link}  target="_blank">Map Link</Link>
                    </div>
                </div>
              </Popup>
            </Marker>
            <Circle center={[d.latitude,d.longitude]} radius={1852} />
          </FeatureGroup>
      
      
        </div>)
      )}
    </MapContainer>
  </>
  )
}
  
export default Map;
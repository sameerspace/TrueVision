import { CircularProgress } from '@mui/material';
import { GoogleMap, useJsApiLoader, MarkerF, DrawingManagerF } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '100vh'
}


function MapView() {

  const [myLoc, setMyLoc] = useState(null)
  const [markers, setMarkers] = useState([])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: ['drawing'],
  })

  useEffect(()=>{
	navigator.geolocation.getCurrentPosition((pos) => {
		setMyLoc({
			lat: pos.coords.latitude,
			lng: pos.coords.longitude,
		})
	},(err) => {
		console.log(err)
	})
  },[])

  const handleMapClick = (e) => {
    setMarkers([...markers,{
		lat: e.latLng.lat(),  
		lng: e.latLng.lng(),
	}])
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={myLoc}
        zoom={15}
		onClick={handleMapClick}
      >
        <>
        { markers.map((loc) => <MarkerF key={`${loc.lat}-${loc.lng}`} position={loc} />) }
        <DrawingManagerF
          options={{
            polygonOptions:{}
          }}
        >
        </DrawingManagerF>
        </>
      </GoogleMap>
  ) : <><CircularProgress/></>
}

export default MapView
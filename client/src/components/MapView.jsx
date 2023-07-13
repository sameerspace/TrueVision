import {Stack, TextField} from '@mui/material'
import {
	GoogleMapsProvider,
	useGoogleMap,
} from '@ubilabs/google-maps-react-hooks'
import {useEffect, useRef, useState} from 'react'

const MapView = () => {
	const [mapContainer, setMapContainer] = useState(null)
	const [myPos, setMyPos] = useState(null)
	const divRef = useRef()

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(data) => {
				setMyPos({lat: data.coords.latitude, lng: data.coords.longitude})
			},
			(error) => console.log(error)
		)
	}, [])

	return (
		<GoogleMapsProvider
			googleMapsAPIKey={import.meta.env.VITE_MAPS_API_KEY}
			mapOptions={{
				zoom: 15,
				center: myPos,
			}}
			mapContainer={mapContainer}
		>
			<div className='lat-lng'>
				<input type='text' />
			</div>
			<div ref={(node) => setMapContainer(node)} style={{height: '92vh'}}></div>
		</GoogleMapsProvider>
	)
}

export default MapView

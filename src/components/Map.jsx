import React, { useEffect, useState, useRef } from 'react';
import Map, { Marker, Popup, NavigationControl, Source, Layer } from 'react-map-gl';
import { interpolateOranges, interpolateGreens, interpolateReds, interpolateYlOrRd } from 'd3-scale-chromatic';
import { useSelector } from 'react-redux';
import Dot from './Dot';
import PopupDetails from './PopupDetails';
import MapboxDirections from '@mapbox/mapbox-sdk/services/directions'
import polyline from '@mapbox/polyline';
import * as turf from '@turf/turf'

const MapView = ({ markers }) => {
    const buildings = useSelector(state => state.global.buildings)
    const [userLocation, setUserLocation] = useState(null);
    const mapType = useSelector(state => state.global.mapType)
    const MapMarker = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 6 7 13 7 13s7-7 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /%3E%3C/svg%3E'
    const selectedMarkerRef = useRef();
    const [selectedMarker, setSelectedMarker] = useState();
    const [directions, setDirections] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: -1.2717167,
        longitude: 36.8139821,
        zoom: 10
    });
    const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2VzbGV5MjU0IiwiYSI6ImNsMzY2dnA0MDAzem0zZG8wZTFzc3B3eG8ifQ.EVg7Sg3_wpa_QO6EJjj9-g'

    const directionsClient = MapboxDirections({
        accessToken: MAPBOX_TOKEN,
    });

    const paymentStatusColors = {
        "Paid": "green",
        "Partially Paid": "yellow",
        "Not Paid": "red",
        "No Occupants": "blue"
      };

    useEffect(() => {
        if (userLocation) {
            setViewport((prevState) => ({
                ...prevState,
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                zoom: 12,
            }));
        }
    }, [userLocation]);

    useEffect(() => {
        // console.log(buildings)
        getUserLocation();
    }, []);

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };


    const handleViewportChange = (newViewport) => {
        setViewport(newViewport);
    };

    const handleSelected = async (marker) => {
        setSelectedMarker((prevMarker) => prevMarker === marker ? null : marker);
        const origin = [userLocation.longitude, userLocation.latitude];
        const destination = [marker?.properties?.longitude, marker?.properties?.latitude];
        const response = await directionsClient.getDirections({
            profile: 'driving',
            waypoints: [
                { coordinates: origin },
                { coordinates: destination }
            ],
            steps: true,
        }).send();
        const coordinates = polyline.decode(response.body.routes[0].geometry)
        const line = turf.lineString(coordinates);
        setDirections(line)
    };

    const handleClosePopup = () => {
        setSelectedMarker(null);
    };

    useEffect(() => {
        selectedMarkerRef.current = selectedMarker;
    }, [selectedMarker]);

    const mapKey = JSON.stringify(viewport);

    const dots = [
        { color: "green", label: "Paid", value: "Paid" },
        { color: "yellow", label: "Partially paid", value: "Partially paid" },
        { color: "red", label: "Not paid", value: "Not paid" },
    ];

    const getHeatmapColor = (value) => {
        const scale = interpolateOranges;
        return scale(value);
    };

    const paidColor = (value) => {
        const scale = interpolateGreens;
        return scale(value);
    };

    const notPaidColor = (value) => {
        const scale = interpolateReds;
        return scale(value);
    };

    const partiallyPaidColor = (value) => {
        const scale = interpolateYlOrRd;
        return scale(value);
    };

    const heatmapLayer = {
        id: 'heatmap-layer',
        type: 'heatmap',
        source: {
            type: 'geojson',
            data: buildings
        },
        paint: {
            'heatmap-opacity': 0.8,
            'heatmap-radius': 15,
            'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['to-number', ['get', 'paymentstatus']],
                0, 0,
                1, 1
            ],
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(0, 0, 255, 0)',
                0.2, notPaidColor(0.2),
                0.4, partiallyPaidColor(0.4),
                0.6, paidColor(0.6),
                0.8, getHeatmapColor(0.8)
            ]
        }
    };

    return (
        <Map
            key={mapKey}
            initialViewState={{ ...viewport }}
            onViewportChange={handleViewportChange}
            style={{ width: '100vw', height: '100vh' }}
            mapStyle="mapbox://styles/wesley254/clezjwl8d002001md18wexpan"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            {userLocation && (
                <Marker latitude={userLocation?.latitude} longitude={userLocation?.longitude}>
                    <div>📍</div>
                </Marker>
            )}

            {mapType === "Markers" ? (buildings?.filter(el => el.properties.paymentstatus === "Paid").map((marker, index) =>
            (
                <Marker key={index} latitude={marker.properties.latitude} longitude={marker.properties.longitude} anchor="bottom">
                    <img
                        onClick={() => handleSelected(marker)}
                        style={{
                            height: "15px",
                            width: "14px",
                            cursor: "pointer",
                            // backgroundColor: marker.properties.paymentstatus === "Paid" ? "green" : marker.properties.paymentstatus === "Partially Paid" ? "yellow" : marker.properties.paymentstatus === "Not Paid" ? "red" : "grey", borderRadius: "50px"
                            backgroundColor: paymentStatusColors[marker.properties.paymentstatus],
                            borderRadius: "50px"
                        }}
                        src={MapMarker} alt="mapmarker" />
                </Marker>
            ))) : mapType === "Clusters" ? (<Source type="geojson" data={{ type: 'FeatureCollection', features: buildings }}>
                <Layer style={{ cursor: 'pointer' }}  {...heatmapLayer} onClick={(e) => {
                    const marker = e.features[0];
                    handleSelected(marker)
                }} interactive={true} />
            </Source>) : (<></>)
            }

            {selectedMarker && (
                <Popup
                    latitude={selectedMarker.properties.latitude}
                    longitude={selectedMarker.properties.longitude}
                    anchor="top-left"
                    onClose={handleClosePopup}
                    closeButton={true}
                    closeOnClick={false}
                >
                    <PopupDetails selectedMarker={selectedMarker} />
                </Popup>
            )}

            {directions && (
                <>
                    <Source id="line-source" type="geojson" data={directions} >
                        <Layer
                            id='directions-layer'
                            type='line'
                            source='line-source'
                            // layout={{ 'line-join': 'round', 'line-cap': 'round' }}
                            paint={{ 'line-color': '#00ff00', 'line-width': 5, 'line-opacity': 0.5 }}
                            interactive={true}
                        />
                    </Source>
                </>

            )}

            <NavigationControl showCompass showZoom position='bottom-left' />
            {dots.map((dot, index) => (
                <Dot
                    key={index}
                    index={index}
                    color={dot.color}
                    label={dot.label}
                />
            ))}
        </Map>
    );
};

export default MapView;
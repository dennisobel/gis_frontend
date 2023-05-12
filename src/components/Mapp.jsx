import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import { styled } from "@mui/material/styles";
import { Box, useTheme } from "@mui/material";
import { Icon } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import MapMarker from "../assets/map.png"
import ReactDOMServer from 'react-dom/server';

const MapContainer = styled(Box)(({ theme }) => ({
    height: "100vh",
    width: "100vw",
}));

const MarkerIcon = styled(Icon)(({ theme }) => ({
    color: "008080",
}));

const Map = ({ markers }) => {
    const theme = useTheme();
    const mapContainerRef = useRef(null);
    const zoomContainerRef = useRef(null);
    const { NavigationControl } = mapboxgl;

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGVubmlzb2JlbCIsImEiOiJjbGg1dmxqYTMwMDBnM2VwaTk2MXNvemh3In0.PCXH5DjguDHHgmaHviCFow'
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-1.2791946549564255, 36.845404805242175],
            zoom: 7,
            preserveDrawingBuffer: true
        });

        // Add zoom control
        const zoomControl = new mapboxgl.NavigationControl({
            showCompass: false,
        });

        map.addControl(zoomControl, "top-right");
        zoomContainerRef.current.appendChild(map.getContainer().querySelector(".mapboxgl-ctrl-group"));


        const nav = new NavigationControl();
        map.addControl(nav, "top-left");


        const bounds = new mapboxgl.LngLatBounds();

        markers.forEach((marker) => {
            const el = document.createElement("div");
            el.className = "marker";
            el.style.backgroundImage = `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 6 7 13 7 13s7-7 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /%3E%3C/svg%3E')`;
            el.style.backgroundSize = "cover";
            el.style.backgroundColor = "teal";
            el.style.width = "30px";
            el.style.height = "30px";
            el.style.cursor = "pointer";

            const link = document.createElement('a');
            link.href = 'https://example.com/my-link';
            link.textContent = 'My link';

            const label = document.createElement('h6')
            label.textContent = marker.label

            const content = document.createElement('div');
            // content.classList.add('custom-popup');
            content.appendChild(label);
            content.appendChild(link);

            const markerPopup = new mapboxgl.Popup({
                anchor: 'bottom',
                offset: [0, -10],
                className: 'custom-popup',
                maxHeight: '200px'
            }).setDOMContent(
                content
            );

            const markerElement = new mapboxgl.Marker(el)
                .setLngLat([marker.lng, marker.lat])
                .addTo(map)
                .getElement();
            const popupHeight = content.offsetHeight;
            const popupWidth = content.offsetWidth;
            const markerHeight = markerElement.offsetHeight;
            const markerWidth = markerElement.offsetWidth;
            const offset = [markerWidth / 2 - popupWidth / 2, -markerHeight / 2 - popupHeight];
            markerPopup.setOffset(offset);

            new mapboxgl.Marker(el)
                .setLngLat([marker.lng, marker.lat])
                .setPopup(markerPopup)
                .addTo(map);

            bounds.extend([marker.lng, marker.lat]);
        });

        map.on("load", () => {
            map.fitBounds(bounds, { padding: 25 });
        });

        const maxBounds = new mapboxgl.LngLatBounds();
        maxBounds.extend([bounds.getWest(), bounds.getSouth()]);
        maxBounds.extend([bounds.getEast(), bounds.getNorth()]);
        // map.setMaxBounds(maxBounds);
        return () => map.remove();
    }, [markers]);

    return (
        <MapContainer ref={mapContainerRef}>
            <div className="map-controls">
                <MarkerIcon theme={theme}>
                    <LocationOn />
                </MarkerIcon>
                <div className="zoom-controls">
                    <div ref={zoomContainerRef} className="mapboxgl-ctrl-top-left" />
                </div>
            </div>
        </MapContainer>
    );
};

export default Map;



// const MapMarker = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 6 7 13 7 13s7-7 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /%3E%3C/svg%3E'


// latitude: markers[Math.floor(markers.length / 2)].properties.latitude,
// longitude: markers[Math.floor(markers.length / 2)].properties.longitude,

{/* {markers.map((marker, index) => (
                <Marker key={index} latitude={marker.properties.latitude} longitude={marker.properties.longitude} anchor="bottom">
                    <img
                        onClick={() => handleSelected(marker)}
                        style={{
                            height: "30px",
                            width: "30px",
                            cursor: "pointer",
                            backgroundColor: marker.properties.paymentstatus === "paid" ? "green" : marker.properties.paymentstatus === "partially paid" ? "yellow" : "red", borderRadius: "50px"
                        }}
                        src={MapMarker} alt="mapmarker" />
                </Marker>
            ))} */}
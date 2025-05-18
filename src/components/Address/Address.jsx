import React,{useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import { useSelector } from 'react-redux';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetina,
    iconUrl: icon,
    shadowUrl: iconShadow,
});

// Create a component to handle map position updates
function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
}

const Address = () => {
    const coordinates = useSelector((state) => state.angleSet.coordinates);
    
    // Return loading state if coordinates are not available
    if (!coordinates || !coordinates.lat || !coordinates.lon) {
        return <div>Loading map...</div>;
    }

    const position = [coordinates.lat, coordinates.lon];

    return (
        <div style={{ height: '40vh', width: '100%' }}>
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                <MapUpdater center={position} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <div>
                            <p>Latitude: {coordinates.lat}</p>
                            <p>Longitude: {coordinates.lon}</p>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Address;
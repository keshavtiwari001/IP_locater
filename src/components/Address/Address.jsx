import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetina,
    iconUrl: icon,
    shadowUrl: iconShadow,
});

const Address = () => {
    const [address, setAddress] = useState(null);
    const [position, setPosition] = useState([51.217101150000005, 6.778318993012505]); // Default coordinates

    const getAddress = async () => {
        try {
            const response = await axios.get('https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=f57745b5b0f74c6b8ba6605d7941d7ca');
            if (response.status === 200) {
                const data = response.data;
                if (data.features && data.features.length > 0) {
                    setAddress(data.features[0].properties);
                    // Update position with coordinates from API
                    setPosition([
                        data.features[0].properties.lat,
                        data.features[0].properties.lon
                    ]);
                }
            }
        } catch (err) {
            console.error("Error fetching address:", err);
        }
    };

    useEffect(() => {
        getAddress();
    }, []);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {address && (
                    <Marker position={position}>
                        <Popup>
                            <div>
                                <h3>{address.name}</h3>
                                <p>{address.formatted}</p>
                            </div>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default Address;
import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import 'leaflet/dist/leaflet.css';

// Correction icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const busIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

function RecenterMap({ position }) {
    const map = useMap();
    useEffect(() => {
        if(position) map.flyTo(position, 13);
    }, [position, map]);
    return null;
}

function BusTracking() {
    const { voyageId } = useParams();
    const [position, setPosition] = useState(null);
    const [connected, setConnected] = useState(false);
    const stompClientRef = useRef(null);

    useEffect(() => {
        // Connexion au notification-service (8087)
        const socket = new SockJS('http://localhost:8087/ws-gps');
        const stompClient = Stomp.over(socket);
        stompClient.debug = () => {}; 

        stompClient.connect({}, () => {
            setConnected(true);
            stompClient.subscribe(`/topic/voyage/${voyageId}`, (message) => {
                if (message.body) {
                    const newPos = JSON.parse(message.body);
                    setPosition([newPos.lat, newPos.lng]);
                }
            });
        });

        stompClientRef.current = stompClient;
        return () => {
            if (stompClientRef.current) stompClientRef.current.disconnect();
        };
    }, [voyageId]);

    return (
        <div className="position-relative" style={{ height: '100vh', width: '100vw' }}>
            <Link to="/passenger/tickets" className="btn btn-light position-absolute top-0 start-0 m-3 shadow fw-bold" style={{ zIndex: 1000 }}>
                <i className="bi bi-arrow-left me-2"></i>Retour
            </Link>

            <div className={`alert ${connected ? 'alert-success' : 'alert-warning'} position-absolute top-0 end-0 m-3 py-2 px-4 shadow rounded-pill`} style={{ zIndex: 1000 }}>
                {connected 
                    ? (position ? "🚍 Bus en mouvement" : "📡 En attente du conducteur...") 
                    : "🔌 Connexion au satellite..."}
            </div>

            <MapContainer center={[33.5731, -7.5898]} zoom={6} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {position && (
                    <>
                        <Marker position={position} icon={busIcon}>
                            <Popup>Le bus est ici !</Popup>
                        </Marker>
                        <RecenterMap position={position} />
                    </>
                )}
            </MapContainer>
        </div>
    );
}

export default BusTracking;
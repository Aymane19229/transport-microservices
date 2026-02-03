import { useState, useRef, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function DriverGPS({ voyageId }) {
    const [isSharing, setIsSharing] = useState(false);
    const [statusText, setStatusText] = useState("Système en veille");
    const stompClientRef = useRef(null);
    const intervalRef = useRef(null); // Pour nettoyer proprement

    // Nettoyage au démontage du composant
    useEffect(() => {
        return () => stopSharing();
    }, []);

    const startSimulation = () => {
        setStatusText("Connexion au satellite...");
        
        // Connexion au Port 8087
        const socket = new SockJS('http://localhost:8087/ws-gps');
        const stompClient = Stomp.over(socket);
        stompClient.debug = () => {}; // Silence les logs

        stompClient.connect({}, () => {
            setIsSharing(true);
            setStatusText("🟢 Transmission en cours");
            stompClientRef.current = stompClient;

            // --- SIMULATION DU TRAJET (Rabat -> Casa) ---
            let lat = 34.020882;
            let lng = -6.841650;

            intervalRef.current = setInterval(() => {
                if (!stompClient.connected) return;

                // On bouge un peu vers le sud-ouest
                lat -= 0.002;
                lng -= 0.002;

                const payload = JSON.stringify({ lat, lng });
                stompClient.send(`/app/sendLocation/${voyageId}`, {}, payload);
            }, 1000); // Envoi toutes les secondes

            // Arrêt automatique de sécurité (5 min)
            setTimeout(() => {
                stopSharing();
            }, 300000);
        }, (error) => {
            console.error("Erreur WebSocket:", error);
            setStatusText("❌ Erreur de connexion");
            setIsSharing(false);
        });
    };

    const stopSharing = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (stompClientRef.current) stompClientRef.current.disconnect();
        setIsSharing(false);
        setStatusText("Système en veille");
    };

    return (
        <div className={`gps-module p-4 rounded-4 text-center transition-all ${isSharing ? 'active-mode' : 'standby-mode'}`}>
            
            {/* Indicateur Visuel (Radar) */}
            <div className="position-relative d-inline-block mb-4">
                <div className={`radar-circle ${isSharing ? 'pulse' : ''}`}>
                    <i className={`bi ${isSharing ? 'bi-broadcast' : 'bi-geo-alt'} fs-1 position-relative z-index-1`}></i>
                </div>
                {isSharing && <div className="radar-wave"></div>}
            </div>

            <h5 className="fw-bold mb-1">GPS Embarqué</h5>
            <div className="d-flex justify-content-center align-items-center mb-4">
                <span className={`badge rounded-pill px-3 py-2 ${isSharing ? 'bg-success' : 'bg-secondary'}`}>
                    {isSharing && <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>}
                    {statusText}
                </span>
            </div>
            
            <p className="text-muted small mb-4">
                Canal de diffusion : <strong>Voyage #{voyageId}</strong>
            </p>

            {!isSharing ? (
                <button onClick={startSimulation} className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm btn-hover-scale">
                    <i className="bi bi-play-fill me-2 fs-5"></i>Démarrer le Trajet
                </button>
            ) : (
                <button onClick={stopSharing} className="btn btn-danger w-100 py-3 rounded-pill fw-bold shadow-sm btn-hover-scale">
                    <i className="bi bi-stop-fill me-2 fs-5"></i>Arrêter la Diffusion
                </button>
            )}

            {/* CSS LOCAL POUR L'ANIMATION RADAR */}
            <style>{`
                .gps-module {
                    border: 1px solid #e9ecef;
                    background: #fff;
                    transition: all 0.3s ease;
                }
                .active-mode {
                    border-color: #198754;
                    background: #f8fff9;
                    box-shadow: 0 10px 30px rgba(25, 135, 84, 0.15);
                }
                .standby-mode {
                    background: #f8f9fa;
                }

                .radar-circle {
                    width: 80px;
                    height: 80px;
                    background: ${isSharing ? '#d1e7dd' : '#e9ecef'};
                    color: ${isSharing ? '#198754' : '#6c757d'};
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                }

                .radar-wave {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    border: 2px solid #198754;
                    animation: radar-ping 2s infinite;
                    opacity: 0;
                }

                @keyframes radar-ping {
                    0% { width: 80px; height: 80px; opacity: 0.8; }
                    100% { width: 200px; height: 200px; opacity: 0; }
                }

                .btn-hover-scale:hover { transform: scale(1.03); transition: 0.2s; }
                .transition-all { transition: all 0.3s ease; }
            `}</style>
        </div>
    );
}

export default DriverGPS;
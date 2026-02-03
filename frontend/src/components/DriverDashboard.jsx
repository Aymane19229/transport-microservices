import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api'; 
import DriverGPS from './DriverGPS';

function DriverDashboard() {
    const navigate = useNavigate();
    const [voyages, setVoyages] = useState([]);
    const [selectedVoyageId, setSelectedVoyageId] = useState(""); 

    // Charger les voyages
    useEffect(() => {
        apiCall('/voyages').then(setVoyages).catch(err => console.error("Erreur chargement voyages", err));
    }, []);

    const handleLogout = () => {
        if(window.confirm("Fin de service ?")) {
            localStorage.clear();
            navigate('/login');
        }
    };

    const currentVoyage = voyages.find(v => v.id.toString() === selectedVoyageId);
    const username = localStorage.getItem('username') || 'Chauffeur';

    return (
        <div className="container py-5 fade-in">
            {/* --- EN-TÊTE --- */}
            <div className="d-flex justify-content-between align-items-center mb-5 bg-white p-4 rounded-4 shadow-sm border-start border-5 border-primary">
                <div>
                    <h6 className="text-uppercase text-muted fw-bold small tracking-wide">Poste de Pilotage</h6>
                    <h2 className="fw-bold mb-0 text-dark">
                        <i className="bi bi-person-badge-fill text-primary me-2"></i>Espace Conducteur
                    </h2>
                </div>
                <div className="d-flex align-items-center gap-4">
                    <div className="text-end d-none d-md-block">
                        <div className="fw-bold text-dark">{username}</div>
                        <small className="text-success"><i className="bi bi-circle-fill small me-1"></i>En service</small>
                    </div>
                    <button onClick={handleLogout} className="btn btn-light text-danger border fw-bold px-4 rounded-pill hover-danger">
                        <i className="bi bi-power me-2"></i>Fin de service
                    </button>
                </div>
            </div>

            <div className="row g-4">
                {/* COLONNE GAUCHE : SÉLECTION DU VOYAGE */}
                <div className="col-lg-6">
                    <div className="card shadow-sm h-100 border-0 rounded-4 overflow-hidden">
                        <div className="card-header bg-primary text-white py-3 px-4 border-0">
                            <h5 className="mb-0 fw-bold"><i className="bi bi-list-check me-2"></i>1. Feuille de Route</h5>
                        </div>
                        <div className="card-body p-4 bg-light bg-opacity-50">
                            <label className="form-label text-muted fw-bold text-uppercase small">Sélectionner la mission</label>
                            
                            <div className="input-group mb-4 shadow-sm rounded-3">
                                <span className="input-group-text bg-white border-0"><i className="bi bi-search"></i></span>
                                <select 
                                    className="form-select form-select-lg border-0" 
                                    value={selectedVoyageId} 
                                    onChange={(e) => setSelectedVoyageId(e.target.value)}
                                    style={{cursor: 'pointer'}}
                                >
                                    <option value="">-- Choisir un voyage --</option>
                                    {voyages.map(v => (
                                        <option key={v.id} value={v.id}>
                                            #{v.id} • {v.trajet.villeDepart} ➝ {v.trajet.villeArrivee} ({new Date(v.dateDepart).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Résumé du voyage sélectionné */}
                            {currentVoyage ? (
                                <div className="card border-0 shadow-sm bg-white rounded-3 animate-up">
                                    <div className="card-body">
                                        <h6 className="fw-bold text-primary mb-3 text-uppercase small tracking-wide">Détails de la mission</h6>
                                        
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="icon-box bg-light text-primary rounded-circle me-3 d-flex align-items-center justify-content-center" style={{width:40, height:40}}>
                                                <i className="bi bi-bus-front-fill"></i>
                                            </div>
                                            <div>
                                                <small className="text-muted d-block">Matricule Bus</small>
                                                <span className="fw-bold">{currentVoyage.bus.matricule}</span>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center mb-3">
                                            <div className="icon-box bg-light text-success rounded-circle me-3 d-flex align-items-center justify-content-center" style={{width:40, height:40}}>
                                                <i className="bi bi-people-fill"></i>
                                            </div>
                                            <div>
                                                <small className="text-muted d-block">Capacité</small>
                                                <span className="fw-bold text-success">{currentVoyage.placesDisponibles} places libres</span>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <div className="icon-box bg-light text-warning rounded-circle me-3 d-flex align-items-center justify-content-center" style={{width:40, height:40}}>
                                                <i className="bi bi-clock-fill"></i>
                                            </div>
                                            <div>
                                                <small className="text-muted d-block">Heure de Départ</small>
                                                <span className="fw-bold">{new Date(currentVoyage.dateDepart).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-muted py-5 opacity-50">
                                    <i className="bi bi-arrow-up-circle display-1 text-primary mb-3"></i>
                                    <p>Veuillez sélectionner votre mission dans la liste ci-dessus.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* COLONNE DROITE : LE GPS */}
                <div className="col-lg-6">
                    <div className="card shadow-sm h-100 border-0 rounded-4 overflow-hidden">
                        <div className="card-header bg-success text-white py-3 px-4 border-0">
                            <h5 className="mb-0 fw-bold"><i className="bi bi-broadcast me-2"></i>2. Contrôle GPS</h5>
                        </div>
                        <div className="card-body p-5 text-center d-flex flex-column justify-content-center bg-white">
                            
                            {selectedVoyageId ? (
                                <div className="fade-in">
                                    <div className="mb-4">
                                        <span className="badge bg-success bg-opacity-10 text-success border border-success px-3 py-2 rounded-pill">
                                            <i className="bi bi-check-circle-fill me-2"></i>Voyage #{selectedVoyageId} Prêt
                                        </span>
                                    </div>
                                    
                                    {/* COMPOSANT GPS */}
                                    <div className="p-1">
                                        <DriverGPS key={selectedVoyageId} voyageId={selectedVoyageId} />
                                    </div>
                                    
                                    <hr className="my-5 opacity-10" />
                                    
                                    <button className="btn btn-outline-dark w-100 py-3 rounded-pill fw-bold hover-scale shadow-sm">
                                        <i className="bi bi-qr-code-scan me-2"></i>Scanner Billets Passagers
                                    </button>
                                </div>
                            ) : (
                                <div className="py-5 text-muted opacity-25">
                                    <i className="bi bi-geo-alt-fill display-1"></i>
                                    <h4 className="mt-4 fw-bold">GPS En Attente</h4>
                                    <p>Le système de localisation s'activera une fois le voyage sélectionné.</p>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>
            
            <style>{`
                .hover-danger:hover { background-color: #dc3545 !important; color: white !important; }
                .hover-scale:hover { transform: scale(1.02); transition: 0.2s; }
                .tracking-wide { letter-spacing: 1px; }
                .animate-up { animation: slideUp 0.3s ease-out; }
                @keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}</style>
        </div>
    );
}

export default DriverDashboard;
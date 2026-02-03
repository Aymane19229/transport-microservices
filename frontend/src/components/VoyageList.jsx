import { useEffect, useState } from 'react';
import { apiCall } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

function VoyageList() {
    const [voyages, setVoyages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 👇 On récupère le statut VIP
    const isSubscriber = localStorage.getItem('isSubscriber') === 'true';
    const passengerId = localStorage.getItem('userId');

    useEffect(() => {
        apiCall('/voyages')
            .then(data => {
                setVoyages(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleReserver = (voyageId) => {
        if (!passengerId) return navigate('/login');
        if (window.confirm("Confirmer la réservation ?")) {
            apiCall(`/bookings?passengerId=${passengerId}&voyageId=${voyageId}`, 'POST')
                .then(() => {
                    alert("Réservation réussie ! Bon voyage 🎟️");
                    navigate('/passenger/tickets');
                })
                .catch(err => alert("Erreur : " + err.message));
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '60vh'}}>
            <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
                <span className="visually-hidden">Chargement...</span>
            </div>
        </div>
    );

    return (
        <div className="container py-5 fade-in">
            {/* --- EN-TÊTE --- */}
            <div className="row align-items-center mb-5">
                <div className="col-md-8">
                    <h2 className="fw-bold display-6 text-dark mb-1">
                        🚌 Prochains Départs
                    </h2>
                    <p className="text-muted">Réservez votre place en quelques clics.</p>
                </div>
                <div className="col-md-4 text-md-end">
                    {isSubscriber ? (
                        <div className="d-inline-block px-4 py-2 bg-warning bg-opacity-10 text-warning border border-warning rounded-pill fw-bold">
                            <i className="bi bi-crown-fill me-2"></i>Mode VIP Activé
                        </div>
                    ) : (
                        <Link to="/passenger/subscription" className="btn btn-outline-dark rounded-pill px-4">
                            💎 Voir les offres VIP
                        </Link>
                    )}
                </div>
            </div>

            {/* --- LISTE DES VOYAGES --- */}
            {voyages.length === 0 ? (
                <div className="text-center py-5">
                    <i className="bi bi-calendar-x text-muted display-1"></i>
                    <p className="mt-3 text-muted">Aucun voyage disponible pour le moment.</p>
                </div>
            ) : (
                <div className="row g-4">
                    {voyages.map(voyage => {
                        // Calcul du prix
                        const originalPrice = voyage.prix || 100;
                        const finalPrice = isSubscriber ? Math.round(originalPrice * 0.7) : originalPrice;
                        const isFull = voyage.placesDisponibles === 0;

                        return (
                            <div key={voyage.id} className="col-lg-4 col-md-6">
                                <div className={`card h-100 border-0 shadow-sm voyage-card ${isSubscriber ? 'vip-border' : ''}`}>
                                    
                                    {/* Badge VIP sur la carte */}
                                    {isSubscriber && (
                                        <div className="position-absolute top-0 end-0 m-3">
                                            <span className="badge bg-warning text-dark shadow-sm">
                                                <i className="bi bi-star-fill me-1"></i> -30%
                                            </span>
                                        </div>
                                    )}

                                    <div className="card-body p-4 d-flex flex-column">
                                        
                                        {/* Trajet */}
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="me-3">
                                                <div className="icon-box bg-light text-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                                                    <i className="bi bi-geo-alt-fill fs-4"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="fw-bold mb-0 text-dark">
                                                    {voyage.trajet.villeDepart} 
                                                    <span className="text-muted mx-2">➝</span> 
                                                    {voyage.trajet.villeArrivee}
                                                </h5>
                                                <small className="text-muted">Voyage #{voyage.id}</small>
                                            </div>
                                        </div>

                                        {/* Infos Pratiques */}
                                        <div className="row g-2 mb-4">
                                            <div className="col-6">
                                                <div className="p-2 bg-light rounded text-center h-100">
                                                    <i className="bi bi-clock text-primary mb-1 d-block"></i>
                                                    <span className="small fw-bold">{new Date(voyage.dateDepart).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                    <div className="text-muted x-small">{new Date(voyage.dateDepart).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-2 bg-light rounded text-center h-100">
                                                    <i className="bi bi-people-fill text-primary mb-1 d-block"></i>
                                                    <span className={`small fw-bold ${isFull ? 'text-danger' : 'text-success'}`}>
                                                        {isFull ? 'COMPLET' : `${voyage.placesDisponibles} places`}
                                                    </span>
                                                    <div className="text-muted x-small">Bus {voyage.bus.matricule}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <div className="d-flex justify-content-between align-items-end mb-3">
                                                <span className="text-muted small">Prix par personne</span>
                                                <div className="text-end lh-1">
                                                    {isSubscriber && (
                                                        <div className="text-decoration-line-through text-muted small mb-1">
                                                            {originalPrice} MAD
                                                        </div>
                                                    )}
                                                    <span className={`fw-bold fs-3 ${isSubscriber ? 'text-success' : 'text-dark'}`}>
                                                        {finalPrice} <small className="fs-6 text-muted">MAD</small>
                                                    </span>
                                                </div>
                                            </div>

                                            <button 
                                                onClick={() => handleReserver(voyage.id)}
                                                disabled={isFull}
                                                className={`btn w-100 py-2 rounded-pill fw-bold transition-btn ${
                                                    isFull ? 'btn-secondary' : (isSubscriber ? 'btn-vip' : 'btn-primary')
                                                }`}>
                                                {isFull ? 'Liste d\'attente' : 'Réserver maintenant'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            
            {/* CSS Personnalisé pour les effets */}
            <style>{`
                .voyage-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                .voyage-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
                .vip-border { border: 1px solid #ffc107 !important; background: linear-gradient(to bottom, #fff, #fffbf0); }
                .x-small { font-size: 0.75rem; }
                
                /* Bouton VIP Gold */
                .btn-vip {
                    background: linear-gradient(45deg, #ffc107, #ffdb4d);
                    border: none;
                    color: #000;
                }
                .btn-vip:hover {
                    background: linear-gradient(45deg, #ffdb4d, #ffc107);
                    transform: scale(1.02);
                }
                .transition-btn { transition: all 0.2s; }
            `}</style>
        </div>
    );
}

export default VoyageList;
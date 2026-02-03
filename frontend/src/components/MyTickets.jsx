import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { apiCall } from '../utils/api'; 

function MyTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const passengerId = localStorage.getItem('userId');

    // Charger les tickets
    const loadTickets = () => {
        apiCall(`/bookings/passenger/${passengerId}`)
            .then(data => {
                setTickets(data.reverse()); // Plus récents en haut
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (!passengerId) navigate('/login');
        else loadTickets();
    }, [passengerId, navigate]);

    // Action d'annulation
    const handleCancel = (ticketId) => {
        if (!window.confirm("Êtes-vous sûr de vouloir annuler ce voyage ? (Cette action est irréversible)")) return;

        apiCall(`/bookings/${ticketId}/cancel`, 'PUT')
            .then(() => {
                alert("✅ Voyage annulé. La place a été libérée.");
                loadTickets(); // Rafraîchir
            })
            .catch(err => alert("Erreur annulation : " + err.message));
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
            <div className="d-flex align-items-center mb-5">
                <Link to="/passenger" className="btn btn-outline-secondary rounded-pill px-4 hover-scale me-4">
                    <i className="bi bi-arrow-left me-2"></i>Retour
                </Link>
                <div>
                    <h2 className="fw-bold mb-0">🎫 Mes Billets</h2>
                    <p className="text-muted mb-0">Retrouvez ici tous vos titres de transport.</p>
                </div>
            </div>

            {tickets.length === 0 ? (
                <div className="text-center py-5 bg-light rounded-3 shadow-sm border border-dashed">
                    <i className="bi bi-ticket-perforated display-1 text-muted opacity-50"></i>
                    <h4 className="mt-3 text-muted">Aucun billet réservé</h4>
                    <Link to="/passenger/voyages" className="btn btn-primary mt-3 rounded-pill px-4">
                        Réserver un voyage
                    </Link>
                </div>
            ) : (
                <div className="row g-4">
                    {tickets.map(ticket => {
                        const isCancelled = ticket.statut === 'ANNULE';

                        return (
                            <div key={ticket.id} className="col-md-6 col-lg-4">
                                <div className={`card h-100 border-0 shadow-sm ticket-card position-relative overflow-hidden ${isCancelled ? 'cancelled-ticket' : ''}`}>
                                    
                                    {/* Bandeau Statut (Top) */}
                                    <div className={`card-header py-3 d-flex justify-content-between align-items-center ${isCancelled ? 'bg-secondary' : 'bg-primary'} text-white`}>
                                        <span className="fw-bold tracking-wide">TICKET #{ticket.id}</span>
                                        <span className={`badge ${isCancelled ? 'bg-dark' : 'bg-white text-primary'} rounded-pill`}>
                                            {ticket.statut}
                                        </span>
                                    </div>

                                    <div className="card-body p-4 text-center d-flex flex-column bg-white">
                                        
                                        {/* Info Voyage */}
                                        <div className="mb-4">
                                            <h6 className="text-muted text-uppercase small fw-bold mb-1">Numéro de Voyage</h6>
                                            <h3 className="fw-bold text-dark">#{ticket.voyageId}</h3>
                                        </div>

                                        {/* Zone QR Code */}
                                        <div className="position-relative mx-auto mb-4">
                                            <div className={`p-3 border rounded-3 bg-light d-inline-block shadow-sm ${isCancelled ? 'opacity-25' : ''}`}>
                                                <QRCodeCanvas 
                                                    value={`TICKET:${ticket.id}-VOYAGE:${ticket.voyageId}`} 
                                                    size={120} 
                                                    level={"H"}
                                                />
                                            </div>
                                            
                                            {/* Tampon Annulé */}
                                            {isCancelled && (
                                                <div className="cancelled-stamp">
                                                    ANNULÉ
                                                </div>
                                            )}
                                        </div>

                                        {/* Boutons d'action */}
                                        <div className="mt-auto d-flex gap-2 justify-content-center">
                                            {!isCancelled ? (
                                                <>
                                                    <button 
                                                        onClick={() => navigate(`/passenger/tracking/${ticket.voyageId}`)}
                                                        className="btn btn-outline-primary btn-action flex-grow-1 rounded-pill fw-bold">
                                                        <i className="bi bi-geo-alt-fill me-2"></i>Suivre le Bus
                                                    </button>
                                                    
                                                    <button 
                                                        onClick={() => handleCancel(ticket.id)} 
                                                        className="btn btn-light text-danger btn-action rounded-circle border-0 shadow-sm"
                                                        title="Annuler le billet"
                                                        style={{width: '45px', height: '45px'}}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </>
                                            ) : (
                                                <button disabled className="btn btn-secondary w-100 rounded-pill opacity-50">
                                                    <i className="bi bi-x-circle me-2"></i>Billet Invalide
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Effet décoratif bas de ticket (pointillés) */}
                                    <div className="card-footer bg-white border-top-dashed py-2 text-center">
                                        <small className="text-muted x-small">Présentez ce code au conducteur</small>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            
            {/* CSS Personnalisé */}
            <style>{`
                .ticket-card { transition: transform 0.3s ease; }
                .ticket-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
                
                .cancelled-ticket { filter: grayscale(100%); opacity: 0.8; }
                
                .cancelled-stamp {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-15deg);
                    font-size: 1.5rem;
                    font-weight: 900;
                    color: #dc3545;
                    border: 3px solid #dc3545;
                    padding: 5px 15px;
                    border-radius: 8px;
                    background-color: rgba(255, 255, 255, 0.9);
                    z-index: 10;
                    letter-spacing: 2px;
                }

                .hover-scale:hover { transform: scale(1.05); transition: 0.2s; }
                .tracking-wide { letter-spacing: 1px; }
                .border-top-dashed { border-top: 2px dashed #dee2e6; }
                .x-small { font-size: 0.75rem; }
            `}</style>
        </div>
    );
}

export default MyTickets;
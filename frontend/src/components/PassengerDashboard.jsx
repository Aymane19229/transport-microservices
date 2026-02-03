import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api'; 

function PassengerDashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || 'Voyageur';
    const userId = localStorage.getItem('userId');
    const isSubscriberLocal = localStorage.getItem('isSubscriber') === 'true';

    const [stats, setStats] = useState({ tickets: 0, spending: 0 });
    const [subscription, setSubscription] = useState(null); 

    useEffect(() => {
        if (!userId) return;

        // 1. Charger les stats
        apiCall(`/bookings/passenger/${userId}`).then(data => {
            setStats({
                tickets: data.length,
                spending: data.length * 150 // Simulation du prix
            });
        }).catch(console.error);

        // 2. Charger l'abonnement (API)
        apiCall(`/abonnements/user/${userId}`).then(subs => {
            const activeSub = subs.find(s => s.statut === 'ACTIF');
            if (activeSub) setSubscription(activeSub);
        }).catch(console.error);

    }, [userId]);

    const handleLogout = () => {
        if(window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
            localStorage.clear();
            navigate('/login');
        }
    };

    // Détermine si l'utilisateur est VIP (via API ou LocalStorage)
    const isVip = subscription || isSubscriberLocal;

    return (
        <div className="container py-5 fade-in">
            {/* --- EN-TÊTE --- */}
            <div className="row align-items-center mb-5">
                <div className="col-md-8">
                    <p className="text-muted mb-0 small text-uppercase fw-bold tracking-wide">Espace Membre</p>
                    <h2 className="display-5 fw-bold text-dark">
                        Bonjour, <span className="text-primary">{username}</span> 👋
                    </h2>
                </div>
                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                    <button onClick={handleLogout} className="btn btn-outline-danger rounded-pill px-4 btn-hover-danger">
                        <i className="bi bi-box-arrow-right me-2"></i>Déconnexion
                    </button>
                </div>
            </div>

            {/* --- BARRE DE STATUT --- */}
            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="p-4 bg-white shadow-sm rounded-4 border-start border-4 border-primary h-100">
                        <div className="text-muted small fw-bold text-uppercase mb-1">Voyages réalisés</div>
                        <div className="d-flex align-items-center">
                            <i className="bi bi-ticket-perforated text-primary fs-3 me-3"></i>
                            <h3 className="mb-0 fw-bold">{stats.tickets}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-4 bg-white shadow-sm rounded-4 border-start border-4 border-success h-100">
                        <div className="text-muted small fw-bold text-uppercase mb-1">Budget Transport</div>
                        <div className="d-flex align-items-center">
                            <i className="bi bi-wallet2 text-success fs-3 me-3"></i>
                            <h3 className="mb-0 fw-bold">{stats.spending} <small className="fs-6 text-muted">DH</small></h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`p-4 shadow-sm rounded-4 border-start border-4 h-100 ${isVip ? 'bg-warning bg-opacity-10 border-warning' : 'bg-white border-secondary'}`}>
                        <div className="text-muted small fw-bold text-uppercase mb-1">Statut Actuel</div>
                        <div className="d-flex align-items-center">
                            <i className={`bi ${isVip ? 'bi-crown-fill text-warning' : 'bi-person-circle text-secondary'} fs-3 me-3`}></i>
                            <h4 className={`mb-0 fw-bold ${isVip ? 'text-dark' : 'text-muted'}`}>
                                {isVip ? 'Membre VIP Gold' : 'Voyageur Standard'}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            <h4 className="fw-bold mb-4">Que voulez-vous faire aujourd'hui ?</h4>

            {/* --- CARTES D'ACTION --- */}
            <div className="row g-4">
                {/* Carte 1 : Réserver */}
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-hover rounded-4 action-card">
                        <div className="card-body p-5 text-center">
                            <div className="icon-box bg-primary bg-opacity-10 text-primary mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-bus-front-fill fs-2"></i>
                            </div>
                            <h4 className="fw-bold">Réserver un billet</h4>
                            <p className="text-muted mb-4">Consultez les horaires et réservez votre place.</p>
                            <Link to="/passenger/voyages" className="btn btn-primary w-100 rounded-pill py-2 fw-bold">
                                Voir les offres {isVip && <span className="badge bg-white text-primary ms-2">-30%</span>}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Carte 2 : Mes Tickets */}
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-hover rounded-4 action-card">
                        <div className="card-body p-5 text-center">
                            <div className="icon-box bg-success bg-opacity-10 text-success mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-qr-code-scan fs-2"></i>
                            </div>
                            <h4 className="fw-bold">Mes Tickets</h4>
                            <p className="text-muted mb-4">Accédez à vos QR Codes et suivez votre bus.</p>
                            <Link to="/passenger/tickets" className="btn btn-outline-success w-100 rounded-pill py-2 fw-bold">
                                Ouvrir mon portefeuille
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Carte 3 : Abonnement */}
                <div className="col-md-4">
                    <div className={`card h-100 border-0 shadow-hover rounded-4 action-card ${isVip ? 'border border-warning' : ''}`}>
                        <div className="card-body p-5 text-center">
                            <div className="icon-box bg-warning bg-opacity-10 text-warning mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center">
                                <i className={`bi ${isVip ? 'bi-gem' : 'bi-star'} fs-2`}></i>
                            </div>
                            <h4 className="fw-bold">{isVip ? 'Mon Abonnement' : 'Devenir VIP'}</h4>
                            <p className="text-muted mb-4">
                                {isVip 
                                    ? "Gérez votre offre et vos factures." 
                                    : "Économisez sur chaque trajet en vous abonnant."}
                            </p>
                            <Link to="/passenger/subscription" className={`btn w-100 rounded-pill py-2 fw-bold ${isVip ? 'btn-warning' : 'btn-dark'}`}>
                                {isVip ? 'Gérer mon compte' : 'Découvrir les offres'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CSS Personnalisé --- */}
            <style>{`
                .icon-box { width: 80px; height: 80px; transition: transform 0.3s; }
                .action-card:hover .icon-box { transform: scale(1.1) rotate(5deg); }
                .shadow-hover:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; transition: all 0.3s ease; }
                .btn-hover-danger:hover { background-color: #dc3545; color: white; }
                .tracking-wide { letter-spacing: 1px; }
            `}</style>
        </div>
    );
}

export default PassengerDashboard;
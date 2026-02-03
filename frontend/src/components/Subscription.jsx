import { useNavigate, Link } from 'react-router-dom';

function Subscription() {
    const navigate = useNavigate();

    const handleSubscribe = (plan) => {
        // Simulation du paiement
        if (window.confirm(`Confirmer l'abonnement "${plan}" pour 199 DH/mois ?`)) {
            
            // 1. On sauvegarde le statut "ABONNÉ" dans le navigateur
            localStorage.setItem('isSubscriber', 'true');
            
            alert("🎉 Félicitations ! Vous êtes maintenant Membre VIP Gold.\nVos réductions s'appliquent immédiatement !");
            
            // 2. On redirige vers les voyages pour montrer les prix réduits
            navigate('/passenger/voyages');
            // 3. On recharge pour que la barre de navigation se mette à jour
            window.location.reload(); 
        }
    };

    return (
        <div className="container py-5 fade-in">
            {/* --- EN-TÊTE --- */}
            <div className="d-flex justify-content-between align-items-center mb-5">
                <Link to="/passenger" className="btn btn-outline-secondary rounded-pill px-4 hover-scale">
                    <i className="bi bi-arrow-left me-2"></i>Retour au Dashboard
                </Link>
            </div>

            <div className="text-center mb-5">
                <span className="text-warning text-uppercase fw-bold tracking-wider">Upgrade</span>
                <h2 className="display-4 fw-bold mt-2">Choisissez votre plan</h2>
                <p className="text-muted lead">Voyagez plus, payez moins. Annulez à tout moment.</p>
            </div>
            
            <div className="row justify-content-center g-4">
                {/* --- Carte Standard (Gratuit) --- */}
                <div className="col-md-5 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm pricing-card">
                        <div className="card-body p-5 d-flex flex-column">
                            <h5 className="text-muted text-uppercase fw-bold mb-4">Standard</h5>
                            <div className="d-flex align-items-baseline mb-4">
                                <span className="display-3 fw-bold">0</span>
                                <span className="text-muted ms-2">DH / mois</span>
                            </div>
                            
                            <ul className="list-unstyled mb-5 flex-grow-1">
                                <li className="mb-3"><i className="bi bi-check2 text-primary me-2"></i>Accès à tous les voyages</li>
                                <li className="mb-3"><i className="bi bi-check2 text-primary me-2"></i>Support standard</li>
                                <li className="mb-3 text-muted text-decoration-line-through"><i className="bi bi-x text-muted me-2"></i>Réduction sur les tickets</li>
                                <li className="text-muted text-decoration-line-through"><i className="bi bi-x text-muted me-2"></i>Annulation gratuite</li>
                            </ul>

                            <button disabled className="btn btn-outline-secondary w-100 py-3 rounded-pill fw-bold">
                                Plan Actuel
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Carte GOLD (VIP) --- */}
                <div className="col-md-5 col-lg-4">
                    <div className="card h-100 border-0 shadow pricing-card position-relative overflow-hidden vip-card">
                        {/* Ruban Populaire */}
                        <div className="position-absolute top-0 end-0 bg-warning text-dark fw-bold px-3 py-1 rounded-bottom-start shadow-sm">
                            <i className="bi bi-star-fill me-1"></i> Populaire
                        </div>

                        <div className="card-body p-5 d-flex flex-column">
                            <h5 className="text-warning text-uppercase fw-bold mb-4">Gold VIP 👑</h5>
                            <div className="d-flex align-items-baseline mb-4">
                                <span className="display-3 fw-bold text-dark">199</span>
                                <span className="text-muted ms-2">DH / mois</span>
                            </div>
                            
                            <ul className="list-unstyled mb-5 flex-grow-1">
                                <li className="mb-3 fw-bold"><i className="bi bi-check-circle-fill text-warning me-2"></i>-30% sur TOUS les billets</li>
                                <li className="mb-3"><i className="bi bi-check-circle-fill text-success me-2"></i>Annulation Gratuite</li>
                                <li className="mb-3"><i className="bi bi-check-circle-fill text-success me-2"></i>Place garantie (Prioritaire)</li>
                                <li className="mb-3"><i className="bi bi-check-circle-fill text-success me-2"></i>Support client 24/7</li>
                            </ul>

                            <button 
                                onClick={() => handleSubscribe('Gold')} 
                                className="btn btn-vip w-100 py-3 rounded-pill fw-bold shadow-sm">
                                Devenir Membre VIP
                            </button>
                            <p className="text-center text-muted small mt-3 mb-0">Satisfait ou remboursé</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>{`
                .pricing-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                .pricing-card:hover { transform: translateY(-10px); }
                
                .vip-card { border: 2px solid #ffc107; background: linear-gradient(to bottom, #fff, #fffbf0); }
                .vip-card:hover { box-shadow: 0 20px 40px rgba(255, 193, 7, 0.2) !important; }

                .btn-vip {
                    background: linear-gradient(45deg, #ffc107, #ffca2c);
                    border: none;
                    color: #000;
                    transition: transform 0.2s;
                }
                .btn-vip:hover {
                    background: linear-gradient(45deg, #ffca2c, #ffc107);
                    transform: scale(1.05);
                }
                
                .hover-scale:hover { transform: scale(1.05); }
                .tracking-wider { letter-spacing: 2px; }
            `}</style>
        </div>
    );
}

export default Subscription;
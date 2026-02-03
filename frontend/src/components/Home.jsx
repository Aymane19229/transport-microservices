import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="fade-in overflow-hidden">
            
            {/* --- HERO SECTION --- */}
            <header className="position-relative py-5 overflow-hidden hero-section">
                {/* Cercle décoratif en arrière-plan */}
                <div className="decorative-circle"></div>

                <div className="container position-relative z-index-1 py-5">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-10 col-xl-8">
                            <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-3 fw-bold tracking-wide">
                                🚀 NOUVEAU : SUIVI GPS EN TEMPS RÉEL
                            </span>
                            <h1 className="display-3 fw-bolder mb-4 text-dark">
                                Le Transport Urbain, <br/>
                                <span className="text-primary gradient-text">Réinventé.</span>
                            </h1>
                            <p className="lead text-muted mb-5 px-md-5">
                                Voyagez plus intelligemment. Réservez vos tickets, suivez votre bus à la trace et profitez d'abonnements exclusifs. 
                                Une expérience fluide pour la ville de demain.
                            </p>
                            
                            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                                {/* Bouton Passager */}
                                <Link to="/login" className="btn btn-primary btn-lg rounded-pill px-5 py-3 shadow-lg btn-hover-lift fw-bold">
                                    <i className="bi bi-person-fill me-2"></i>Espace Passager
                                </Link>
                                
                                {/* Bouton Conducteur */}
                                <Link to="/login" className="btn btn-white btn-lg rounded-pill px-5 py-3 shadow-sm border fw-bold text-dark btn-hover-lift">
                                    <i className="bi bi-bus-front-fill me-2"></i>Espace Conducteur
                                </Link>
                            </div>

                            <div className="mt-5 text-muted small">
                                <span className="mx-2"><i className="bi bi-check-circle-fill text-success me-1"></i>Sans engagement</span>
                                <span className="mx-2"><i className="bi bi-check-circle-fill text-success me-1"></i>Paiement sécurisé</span>
                                <span className="mx-2"><i className="bi bi-check-circle-fill text-success me-1"></i>Support 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- FEATURES SECTION --- */}
            <section className="py-5 bg-light-subtle">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-6">Pourquoi nous choisir ?</h2>
                        <p className="text-muted">Tout ce dont vous avez besoin dans une seule app.</p>
                    </div>

                    <div className="row g-4">
                        {/* Feature 1 */}
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-hover feature-card p-4 text-center bg-white rounded-4">
                                <div className="icon-box bg-primary bg-opacity-10 text-primary mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center">
                                    <i className="bi bi-geo-alt-fill fs-3"></i>
                                </div>
                                <h3 className="h4 fw-bold">Tracking GPS</h3>
                                <p className="text-muted mb-0">Fini l'attente incertaine sous la pluie. Visualisez la position exacte de votre bus en direct sur la carte.</p>
                            </div>
                        </div>
                        
                        {/* Feature 2 */}
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-hover feature-card p-4 text-center bg-white rounded-4">
                                <div className="icon-box bg-success bg-opacity-10 text-success mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center">
                                    <i className="bi bi-qr-code fs-3"></i>
                                </div>
                                <h3 className="h4 fw-bold">E-Tickets Instantanés</h3>
                                <p className="text-muted mb-0">Réservez en 2 clics. Scannez votre QR Code à la montée. Zéro papier, zéro stress.</p>
                            </div>
                        </div>
                        
                        {/* Feature 3 */}
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-hover feature-card p-4 text-center bg-white rounded-4">
                                <div className="icon-box bg-warning bg-opacity-10 text-warning mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center">
                                    <i className="bi bi-gem fs-3"></i>
                                </div>
                                <h3 className="h4 fw-bold">Abonnements VIP</h3>
                                <p className="text-muted mb-0">Devenez membre Gold et profitez de réductions exclusives et d'un service prioritaire.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="py-5 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)' }}>
                <div className="container position-relative z-index-1 text-center py-4">
                    <h2 className="text-white display-5 fw-bold mb-3">Prêt à voyager autrement ?</h2>
                    <p className="lead text-white-50 mb-5">Rejoignez la communauté et simplifiez votre quotidien dès aujourd'hui.</p>
                    <Link to="/signup" className="btn btn-light btn-lg rounded-pill px-5 py-3 fw-bold text-primary shadow-lg btn-hover-scale">
                        Créer un compte gratuit <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-5 bg-dark text-white">
                <div className="container">
                    <div className="row gy-4 justify-content-between align-items-center">
                        <div className="col-md-6 text-center text-md-start">
                            <h5 className="fw-bold mb-1">🚌 SmartTransport</h5>
                            <p className="text-white-50 small mb-0">La solution de mobilité urbaine connectée.</p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="social-links mb-3">
                                <a href="#" className="text-white-50 me-3 hover-white"><i className="bi bi-facebook fs-5"></i></a>
                                <a href="#" className="text-white-50 me-3 hover-white"><i className="bi bi-twitter-x fs-5"></i></a>
                                <a href="#" className="text-white-50 hover-white"><i className="bi bi-instagram fs-5"></i></a>
                            </div>
                            <p className="mb-0 text-white-50 small">© 2025 Projet PFE. Fait avec ❤️ et Spring Boot.</p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* --- CSS PERSONNALISÉ --- */}
            <style>{`
                .hero-section { background: linear-gradient(to bottom, #ffffff, #f8f9fa); }
                .gradient-text { background: linear-gradient(45deg, #2563eb, #0d6efd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                
                .decorative-circle {
                    position: absolute;
                    top: -100px;
                    right: -100px;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, rgba(255,255,255,0) 70%);
                    border-radius: 50%;
                    z-index: 0;
                }

                .icon-box { width: 80px; height: 80px; transition: transform 0.3s; }
                .feature-card:hover .icon-box { transform: scale(1.1) rotate(5deg); }
                .shadow-hover:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; transition: all 0.3s ease; }
                
                .btn-hover-lift { transition: transform 0.2s; }
                .btn-hover-lift:hover { transform: translateY(-3px); }
                .btn-hover-scale:hover { transform: scale(1.05); }
                
                .hover-white:hover { color: #fff !important; }
                .tracking-wide { letter-spacing: 1px; }
            `}</style>
        </div>
    );
}

export default Home;
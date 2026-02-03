import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Petit état pour l'effet de chargement
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true); // Active le spinner
        
        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(res => {
            if (!res.ok) throw new Error("Identifiants incorrects");
            return res.json();
        })
        .then(data => {
            // Stockage des infos
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);
            localStorage.setItem('role', data.role);
            localStorage.setItem('userId', data.userId);

            // Redirection selon le rôle
            if (data.role === 'ADMIN') {
                navigate('/admin');
            } else if (data.role === 'CONDUCTEUR') {
                navigate('/driver');
            } else {
                navigate('/passenger');
            }
        })
        .catch(err => {
            alert(err.message);
            setLoading(false); // Arrête le spinner en cas d'erreur
        });
    };

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light position-relative overflow-hidden fade-in">
            
            {/* Décoration d'arrière-plan */}
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-overlay"></div>
            <div className="position-absolute bottom-0 end-0 p-5 d-none d-lg-block">
                <i className="bi bi-bus-front-fill text-primary opacity-10 display-1" style={{fontSize: '15rem'}}></i>
            </div>

            {/* Bouton Retour Accueil */}
            <div className="position-absolute top-0 start-0 m-4 z-index-1">
                <Link to="/" className="btn btn-light shadow-sm rounded-pill fw-bold px-3 hover-scale text-decoration-none">
                    <i className="bi bi-arrow-left me-2"></i>Accueil
                </Link>
            </div>

            <div className="card p-4 p-md-5 shadow-lg border-0 rounded-4 z-index-1" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="text-center mb-5">
                    <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: 70, height: 70}}>
                        <i className="bi bi-shield-lock-fill fs-2"></i>
                    </div>
                    <h2 className="fw-bold text-dark">Bon retour !</h2>
                    <p className="text-muted">Connectez-vous à votre espace.</p>
                </div>

                <form onSubmit={handleLogin} autoComplete="off">
                    
                    <div className="mb-4">
                        <label className="form-label small fw-bold text-uppercase text-muted">Identifiant</label>
                        <div className="input-group input-group-lg shadow-sm rounded-3 overflow-hidden">
                            <span className="input-group-text bg-white border-0 ps-3 text-muted"><i className="bi bi-person"></i></span>
                            <input 
                                type="text" 
                                className="form-control border-0 bg-white ps-2" 
                                placeholder="Votre nom d'utilisateur"
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label small fw-bold text-uppercase text-muted">Mot de passe</label>
                        <div className="input-group input-group-lg shadow-sm rounded-3 overflow-hidden">
                            <span className="input-group-text bg-white border-0 ps-3 text-muted"><i className="bi bi-key"></i></span>
                            <input 
                                type="password" 
                                className="form-control border-0 bg-white ps-2" 
                                placeholder="••••••••"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="remember" />
                            <label className="form-check-label text-muted small" htmlFor="remember">Se souvenir de moi</label>
                        </div>
                        <a href="#" className="text-primary small text-decoration-none fw-bold">Mot de passe oublié ?</a>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm btn-hover-scale d-flex justify-content-center align-items-center">
                        {loading ? <div className="spinner-border spinner-border-sm me-2"></div> : null}
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <div className="text-center mt-5">
                    <p className="text-muted mb-0">Pas encore de compte ?</p>
                    <Link to="/signup" className="text-primary fw-bold text-decoration-none hover-underline">Créer un compte passager</Link>
                </div>
            </div>
            
            <style>{`
                .bg-gradient-overlay {
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                }
                .hover-scale:hover { transform: scale(1.05); transition: 0.2s; }
                .btn-hover-scale:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2) !important; transition: all 0.2s; }
                .hover-underline:hover { text-decoration: underline !important; }
                .input-group:focus-within { box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important; transition: box-shadow 0.2s; }
            `}</style>
        </div>
    );
}

export default Login;
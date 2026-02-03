import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api';

function AdminDashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || 'Administrateur';

    // --- ÉTATS ---
    const [activeTab, setActiveTab] = useState('voyages'); 
    
    // Données
    const [users, setUsers] = useState([]);
    const [buses, setBuses] = useState([]);
    const [trajets, setTrajets] = useState([]);
    const [voyages, setVoyages] = useState([]);

    // Formulaires
    const [newBus, setNewBus] = useState({ matricule: '', capacite: 50 });
    const [newTrajet, setNewTrajet] = useState({ villeDepart: '', villeArrivee: '' });
    const [newVoyage, setNewVoyage] = useState({ busId: '', trajetId: '', prix: 150, dateDepart: '' });

    // --- CHARGEMENT ---
    useEffect(() => { refreshAllData(); }, []);

    const refreshAllData = () => {
        apiCall('/users').then(setUsers).catch(console.error);
        apiCall('/bus').then(setBuses).catch(console.error);
        apiCall('/trajets').then(setTrajets).catch(console.error);
        apiCall('/voyages').then(setVoyages).catch(console.error);
    };

    const handleLogout = () => {
        if(window.confirm("Déconnexion de l'interface admin ?")) {
            localStorage.clear();
            navigate('/login');
        }
    };

    // --- ACTIONS (Logique conservée) ---
    const handleAddTrajet = (e) => {
        e.preventDefault();
        apiCall('/trajets', 'POST', newTrajet)
            .then(() => { alert("✅ Route créée avec succès !"); setNewTrajet({ villeDepart: '', villeArrivee: '' }); refreshAllData(); })
            .catch(err => alert("Erreur : " + err.message));
    };

    const handleDeleteTrajet = (id) => {
        if(!window.confirm("Supprimer cette route ?")) return;
        apiCall(`/trajets/${id}`, 'DELETE').then(refreshAllData).catch(e => alert(e.message));
    };

    const handleCreateVoyage = (e) => {
        e.preventDefault();
        const voyagePayload = {
            dateDepart: newVoyage.dateDepart,
            prix: parseFloat(newVoyage.prix),
            placesDisponibles: 50,
            bus: { id: newVoyage.busId },
            trajet: { id: newVoyage.trajetId }
        };
        apiCall('/voyages', 'POST', voyagePayload)
            .then(() => { alert("✅ Voyage publié et visible par les clients !"); setNewVoyage({ ...newVoyage, dateDepart: '' }); refreshAllData(); })
            .catch(err => alert("Erreur : " + err.message));
    };

    const handleDeleteVoyage = (id) => { if(window.confirm("Annuler ce voyage ?")) apiCall(`/voyages/${id}`, 'DELETE').then(refreshAllData); };
    const handleDeleteUser = (id) => { if(window.confirm("Bannir cet utilisateur ?")) apiCall(`/users/${id}`, 'DELETE').then(refreshAllData); };
    const handleAddBus = (e) => { e.preventDefault(); apiCall('/bus', 'POST', newBus).then(() => { alert("Bus ajouté à la flotte"); refreshAllData(); }); };
    const handleDeleteBus = (id) => { if(window.confirm("Retirer ce bus ?")) apiCall(`/bus/${id}`, 'DELETE').then(refreshAllData); };

    // --- RENDER ---
    return (
        <div className="container-fluid bg-light min-vh-100">
            <div className="container py-5 fade-in">
                
                {/* --- HEADER --- */}
                <div className="d-flex justify-content-between align-items-center mb-5 bg-white p-4 rounded-4 shadow-sm border-start border-5 border-danger">
                    <div>
                        <h6 className="text-uppercase text-muted fw-bold small tracking-wide">Interface de Gestion</h6>
                        <h2 className="fw-bold mb-0 text-dark">
                            <i className="bi bi-shield-lock-fill text-danger me-2"></i>Admin Dashboard
                        </h2>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                        <div className="text-end d-none d-md-block">
                            <div className="fw-bold text-dark">{username}</div>
                            <small className="text-success"><i className="bi bi-circle-fill small me-1"></i>En ligne</small>
                        </div>
                        <button onClick={handleLogout} className="btn btn-light text-danger border fw-bold px-4 rounded-pill hover-danger">
                            <i className="bi bi-power me-2"></i>Sortir
                        </button>
                    </div>
                </div>

                {/* --- NAVIGATION --- */}
                <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
                    <div className="card-body p-2">
                        <ul className="nav nav-pills nav-fill gap-2">
                            <li className="nav-item">
                                <button className={`nav-link rounded-pill py-3 fw-bold ${activeTab === 'voyages' ? 'bg-primary text-white shadow' : 'text-muted'}`} onClick={() => setActiveTab('voyages')}>
                                    <i className="bi bi-map me-2"></i>Planification
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link rounded-pill py-3 fw-bold ${activeTab === 'trajets' ? 'bg-warning text-dark shadow' : 'text-muted'}`} onClick={() => setActiveTab('trajets')}>
                                    <i className="bi bi-signpost-2 me-2"></i>Routes
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link rounded-pill py-3 fw-bold ${activeTab === 'bus' ? 'bg-info text-white shadow' : 'text-muted'}`} onClick={() => setActiveTab('bus')}>
                                    <i className="bi bi-bus-front me-2"></i>Flotte
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link rounded-pill py-3 fw-bold ${activeTab === 'users' ? 'bg-dark text-white shadow' : 'text-muted'}`} onClick={() => setActiveTab('users')}>
                                    <i className="bi bi-people me-2"></i>Utilisateurs
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* --- CONTENU --- */}
                
                {/* 1. GESTION VOYAGES */}
                {activeTab === 'voyages' && (
                    <div className="row g-4 fade-in">
                        <div className="col-lg-4">
                            <div className="card shadow-sm border-0 rounded-4 h-100">
                                <div className="card-header bg-white pt-4 pb-0 border-0">
                                    <h5 className="fw-bold text-primary"><i className="bi bi-plus-circle me-2"></i>Nouveau Départ</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleCreateVoyage}>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-muted">Choisir le Bus</label>
                                            <select className="form-select form-select-lg bg-light border-0" value={newVoyage.busId} onChange={e => setNewVoyage({...newVoyage, busId: e.target.value})} required>
                                                <option value="">-- Sélectionner --</option>
                                                {buses.map(b => <option key={b.id} value={b.id}>{b.matricule} ({b.capacite}p)</option>)}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-muted">Choisir la Route</label>
                                            <select className="form-select form-select-lg bg-light border-0" value={newVoyage.trajetId} onChange={e => setNewVoyage({...newVoyage, trajetId: e.target.value})} required>
                                                <option value="">-- Sélectionner --</option>
                                                {trajets.length === 0 && <option disabled>Aucune route disponible</option>}
                                                {trajets.map(t => <option key={t.id} value={t.id}>{t.villeDepart} ➝ {t.villeArrivee}</option>)}
                                            </select>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-6">
                                                <label className="form-label small fw-bold text-muted">Date</label>
                                                <input type="datetime-local" className="form-control bg-light border-0" value={newVoyage.dateDepart} onChange={e => setNewVoyage({...newVoyage, dateDepart: e.target.value})} required />
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label small fw-bold text-muted">Prix (DH)</label>
                                                <input type="number" className="form-control bg-light border-0" value={newVoyage.prix} onChange={e => setNewVoyage({...newVoyage, prix: e.target.value})} required />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm">
                                            Publier le Voyage
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="card shadow-sm border-0 rounded-4 h-100">
                                <div className="card-header bg-white pt-4 border-0 d-flex justify-content-between align-items-center">
                                    <h5 className="fw-bold mb-0">Départs Programmés</h5>
                                    <span className="badge bg-light text-dark border">{voyages.length} actifs</span>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle mb-0">
                                            <thead className="bg-light text-muted small text-uppercase">
                                                <tr><th className="ps-4">Date</th><th>Route</th><th>Bus</th><th>Prix</th><th className="text-end pe-4">Action</th></tr>
                                            </thead>
                                            <tbody>
                                                {voyages.length === 0 ? <tr><td colSpan="5" className="text-center py-5 text-muted">Aucun voyage planifié.</td></tr> : 
                                                    voyages.map(v => (
                                                        <tr key={v.id}>
                                                            <td className="ps-4 fw-bold">{new Date(v.dateDepart).toLocaleDateString()} <br/><small className="text-muted fw-normal">{new Date(v.dateDepart).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</small></td>
                                                            <td>{v.trajet ? <span className="badge bg-info bg-opacity-10 text-info border border-info rounded-pill px-3">{v.trajet.villeDepart} ➝ {v.trajet.villeArrivee}</span> : '?'}</td>
                                                            <td><span className="font-monospace text-muted"><i className="bi bi-bus-front me-1"></i>{v.bus ? v.bus.matricule : '?'}</span></td>
                                                            <td className="fw-bold text-success">{v.prix} DH</td>
                                                            <td className="text-end pe-4">
                                                                <button onClick={() => handleDeleteVoyage(v.id)} className="btn btn-light text-danger btn-sm rounded-circle shadow-sm hover-scale"><i className="bi bi-trash-fill"></i></button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. GESTION ROUTES */}
                {activeTab === 'trajets' && (
                    <div className="row g-4 fade-in">
                        <div className="col-md-4">
                            <div className="card shadow-sm border-0 rounded-4">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-4 text-warning"><i className="bi bi-signpost-split me-2"></i>Nouvelle Route</h5>
                                    <form onSubmit={handleAddTrajet}>
                                        <div className="form-floating mb-3">
                                            <input className="form-control bg-light border-0" id="depart" placeholder="Ex: Rabat" value={newTrajet.villeDepart} onChange={e => setNewTrajet({...newTrajet, villeDepart: e.target.value})} required />
                                            <label htmlFor="depart">Ville de Départ</label>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input className="form-control bg-light border-0" id="arrivee" placeholder="Ex: Tanger" value={newTrajet.villeArrivee} onChange={e => setNewTrajet({...newTrajet, villeArrivee: e.target.value})} required />
                                            <label htmlFor="arrivee">Ville d'Arrivée</label>
                                        </div>
                                        <button className="btn btn-warning w-100 py-3 fw-bold rounded-pill shadow-sm">Créer la Route</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card shadow-sm border-0 rounded-4">
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush">
                                        {trajets.length === 0 && <div className="p-5 text-center text-muted">Aucune route définie pour le moment.</div>}
                                        {trajets.map(t => (
                                            <li key={t.id} className="list-group-item p-4 d-flex justify-content-between align-items-center hover-bg-light">
                                                <div className="d-flex align-items-center">
                                                    <div className="icon-box bg-light text-dark rounded-circle me-3 d-flex align-items-center justify-content-center" style={{width:40, height:40}}><i className="bi bi-geo-alt"></i></div>
                                                    <div>
                                                        <span className="fw-bold fs-5">{t.villeDepart}</span>
                                                        <i className="bi bi-arrow-right mx-3 text-muted"></i>
                                                        <span className="fw-bold fs-5">{t.villeArrivee}</span>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleDeleteTrajet(t.id)} className="btn btn-outline-danger btn-sm rounded-pill px-3">Supprimer</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. GESTION BUS */}
                {activeTab === 'bus' && (
                    <div className="row g-4 fade-in">
                        <div className="col-md-4">
                            <div className="card shadow-sm border-0 rounded-4 bg-info bg-opacity-10">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-4 text-info"><i className="bi bi-truck me-2"></i>Ajouter un Bus</h5>
                                    <form onSubmit={handleAddBus}>
                                        <input className="form-control form-control-lg mb-3 border-0 shadow-sm" placeholder="Matricule (ex: 1234-A-50)" value={newBus.matricule} onChange={e => setNewBus({...newBus, matricule: e.target.value})} />
                                        <input className="form-control form-control-lg mb-4 border-0 shadow-sm" type="number" placeholder="Capacité (ex: 50)" value={newBus.capacite} onChange={e => setNewBus({...newBus, capacite: e.target.value})} />
                                        <button className="btn btn-info text-white w-100 py-3 fw-bold rounded-pill shadow-sm">Enregistrer</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="row g-3">
                                {buses.map(b => (
                                    <div key={b.id} className="col-md-6">
                                        <div className="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-bus-front-fill fs-1 text-secondary me-3"></i>
                                                <div>
                                                    <h5 className="fw-bold mb-0">{b.matricule}</h5>
                                                    <small className="text-muted">{b.capacite} places</small>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDeleteBus(b.id)} className="btn btn-light text-danger rounded-circle"><i className="bi bi-trash"></i></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. GESTION USERS */}
                {activeTab === 'users' && (
                    <div className="card border-0 shadow-sm rounded-4 fade-in">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0 fw-bold">Utilisateurs Inscrits</h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light"><tr><th className="ps-4">Utilisateur</th><th>Rôle</th><th>Statut</th><th className="text-end pe-4">Action</th></tr></thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-light rounded-circle text-muted d-flex align-items-center justify-content-center me-3" style={{width:35,height:35}}>
                                                        <i className="bi bi-person-fill"></i>
                                                    </div>
                                                    <span className="fw-bold">{u.username}</span>
                                                </div>
                                            </td>
                                            <td><span className={`badge rounded-pill ${u.role === 'ADMIN' ? 'bg-danger' : (u.role === 'CONDUCTEUR' ? 'bg-warning text-dark' : 'bg-primary')}`}>{u.role}</span></td>
                                            <td><span className="text-success small"><i className="bi bi-check-circle-fill me-1"></i>Actif</span></td>
                                            <td className="text-end pe-4">
                                                {u.role !== 'ADMIN' && <button onClick={() => handleDeleteUser(u.id)} className="btn btn-outline-danger btn-sm rounded-pill px-3">Bannir</button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
            
            <style>{`
                .hover-scale:hover { transform: scale(1.1); transition: 0.2s; }
                .hover-bg-light:hover { background-color: #f8f9fa; }
                .hover-danger:hover { background-color: #dc3545 !important; color: white !important; }
                .tracking-wide { letter-spacing: 1px; }
            `}</style>
        </div>
    );
}

export default AdminDashboard;
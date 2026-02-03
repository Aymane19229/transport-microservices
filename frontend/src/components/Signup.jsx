import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    // Champs du formulaire (correspondent à ton entité Utilisateur Java)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        nom: '',
        prenom: '',
        role: 'PASSAGER' // Par défaut
    });
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Appel à la Gateway (Port 8080)
        fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(async res => {
            const text = await res.text(); // Ton backend renvoie une String simple
            if (!res.ok) throw new Error(text || "Erreur d'inscription");
            return text;
        })
        .then(data => {
            setSuccess("Compte créé avec succès ! Redirection vers le login...");
            setTimeout(() => {
                navigate('/login');
            }, 2000); // On attend 2 secondes avant de rediriger
        })
        .catch(err => {
            console.error(err);
            setError(err.message);
        });
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h3 className="text-center mb-4">Créer un compte</h3>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSignup}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nom</label>
                            <input type="text" name="nom" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Prénom</label>
                            <input type="text" name="prenom" className="form-control" onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nom d'utilisateur (Pseudo)</label>
                        <input type="text" name="username" className="form-control" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mot de passe</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Je suis un :</label>
                        <select name="role" className="form-select" onChange={handleChange} value={formData.role}>
                            <option value="PASSAGER">Passager</option>
                            <option value="CONDUCTEUR">Conducteur</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success w-100 mb-3">S'inscrire</button>
                    
                    <div className="text-center">
                        <small>Déjà un compte ? <Link to="/login">Se connecter</Link></small>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    // 1. Pas connecté ? -> Login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // 2. Mauvais rôle ? -> Accueil (Ex: Un passager essaie d'aller sur /driver)
    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/" />; 
    }

    // 3. Tout est bon -> Entrez !
    return children;
};

export default PrivateRoute;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PassengerDashboard from './components/PassengerDashboard';
import DriverDashboard from './components/DriverDashboard';
import AdminDashboard from './components/AdminDashboard';
import VoyageList from './components/VoyageList';
import Subscription from './components/Subscription';
import PrivateRoute from './components/PrivateRoute';
import MyTickets from './components/MyTickets';

// 👇 IMPORT DU VRAI TRACKING (Une seule fois !)
import BusTracking from './components/BusTracking';

// Si tu as encore un ancien fichier "BusTracker.jsx", tu peux le réimporter ici avec un nom différent si besoin :
// import BusTracker from './components/BusTracker'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* PASSAGER */}
        <Route path="/passenger" element={<PrivateRoute requiredRole="PASSAGER"><PassengerDashboard /></PrivateRoute>} />
        <Route path="/passenger/voyages" element={<PrivateRoute requiredRole="PASSAGER"><VoyageList /></PrivateRoute>} />
        
        {/* Route générique (Ancien tracker) - Je l'ai pointée vers le nouveau pour éviter les erreurs */}
        <Route path="/passenger/tracker" element={<PrivateRoute requiredRole="PASSAGER"><BusTracking /></PrivateRoute>} />
        
        <Route path="/passenger/subscription" element={<PrivateRoute requiredRole="PASSAGER"><Subscription /></PrivateRoute>} />
        
        <Route 
          path="/passenger/tickets" 
          element={<PrivateRoute requiredRole="PASSAGER"><MyTickets /></PrivateRoute>} 
        />

        {/* 👇 LA ROUTE PRINCIPALE DU GPS (Avec l'ID du voyage) */}
        <Route 
          path="/passenger/tracking/:voyageId" 
          element={
            <PrivateRoute requiredRole="PASSAGER">
              <BusTracking />
            </PrivateRoute>
          } 
        />

        {/* CONDUCTEUR */}
        <Route path="/driver" element={<PrivateRoute requiredRole="CONDUCTEUR"><DriverDashboard /></PrivateRoute>} />

        {/* ADMIN */}
        <Route path="/admin" element={<PrivateRoute requiredRole="ADMIN"><AdminDashboard /></PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
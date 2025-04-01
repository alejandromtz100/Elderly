import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './auth/Login';
import Register from './auth/Register';
import Inicio from './pages/inicio';
import Admin from './pages/admin';
import Navbar from './componentes/Navbar';
import NavbarAdmin from './componentes/NavAdmin';
import RegistroAdulto from './usuario/registroadulto';
import ErrorBoundary from './components/ErrorBoundary';

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<Inicio />} />
        
        {/* Rutas de autenticación con animaciones */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Otras rutas */}
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registroadulto" element={<RegistroAdulto />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/navbaradmin" element={<NavbarAdmin />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
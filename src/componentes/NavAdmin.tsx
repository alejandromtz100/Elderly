import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaPowerOff,
} from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      setUsuario(user);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    setIsLoggingOut(true);
    
    // Simular proceso de cierre de sesión
    setTimeout(() => {
      localStorage.removeItem("usuario");
      localStorage.removeItem("tempToken");
      localStorage.removeItem("tokenPermanente");
      setUsuario(null);
      setIsLoggingOut(false);
      navigate("/");
      window.location.reload();
    }, 2000);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <nav className={`bg-white fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? "" : ""}`}>
      {/* Overlay de carga al cerrar sesión */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -180 }}
              animate={{ 
                scale: 1,
                rotate: 0,
                transition: { 
                  rotate: { 
                    repeat: Infinity, 
                    duration: 1, 
                    ease: "linear" 
                  } 
                }
              }}
              className="w-20 h-20 rounded-full border-4 border-t-red-600 border-r-red-600 border-b-transparent border-l-transparent flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                  transition: { repeat: Infinity, duration: 1.5 }
                }}
                className="w-16 h-16 rounded-full border-2 border-t-red-400 border-r-red-400 border-b-transparent border-l-transparent"
              />
            </motion.div>
            <div className="absolute bottom-10 text-white text-lg font-medium">
              Cerrando sesión...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de confirmación de cierre de sesión */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-xl"
            >
              <div className="p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">¿Cerrar sesión?</h3>
                <p className="text-gray-500 mb-6">
                  ¿Estás seguro de que deseas salir de tu cuenta?
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    onClick={cancelLogout}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    onClick={confirmLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="/inicio"
              className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              style={{ fontFamily: "Hotline, sans-serif" }}
            >
              elderly
            </a>
          </div>

          {/* Menú de usuario */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {usuario && (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                      {usuario.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    {usuario}
                  </span>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100">
                    {/* Footer del menú */}
                    <div className="border-t border-gray-100 px-5 py-3 bg-gray-50">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <div className="flex items-center">
                          <FaPowerOff className="mr-2 text-xl text-red-600" />
                          <span>Cerrar sesión</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Botón móvil */}
          <div className="md:hidden flex items-center">
            <button
              className="text-blue-600 hover:text-blue-700 focus:outline-none transition-all duration-200 transform hover:rotate-90"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <FaTimes className="h-7 w-7" />
              ) : (
                <FaBars className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && usuario && (
        <div className="md:hidden bg-white">
          <ul className="px-4 py-3 space-y-1">
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 font-medium transition-colors duration-200"
              >
                <FaPowerOff className="mr-3 text-xl text-red-600" />
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav> 
  );
};

export default Navbar;
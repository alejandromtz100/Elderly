import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import aversiestesi from '../assets/aversiestesi.png';
import portada2 from '../assets/portada2.jpg';

export const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contra, setContra] = useState('');
  const [recordarDisp, setRecordarDisp] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Mostrar carga por 5 segundos
    setTimeout(async () => {
      try {
        const response = await fetch('https://api-elderly.onrender.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuario,
            contra,
            recordarDisp
          }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data.error || 'Error al iniciar sesión');
        }
        
        if (data.tempToken) localStorage.setItem('tempToken', data.tempToken);
        if (data.tokenPermanente) localStorage.setItem('tokenPermanente', data.tokenPermanente);
        localStorage.setItem('usuario', data.usuario);
        if (data._id) localStorage.setItem('userId', data._id);

        // Mostrar modal de éxito
        setShowSuccess(true);
        setIsLoading(false);
        
        // Redirigir después de 2 segundos del modal
        setTimeout(() => {
          navigate(data.rol === 'admin' ? '/admin' : '/inicio');
          window.location.reload();
        }, 2000);
    
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error al iniciar sesión');
        setIsLoading(false);
      }
    }, 5000); // 5 segundos de carga
  };

  const goToRegister = () => {
    navigate('/register', { state: { fromLogin: true } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-50 relative"
    >
      {/* Overlay de carga - Dura exactamente 5 segundos */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -180 }}
              animate={{ 
                scale: 1,
                rotate: 0,
                transition: { 
                  rotate: { 
                    repeat: Infinity, 
                    duration: 1.5, // Más lento para que dure los 5 segundos
                    ease: "linear" 
                  },
                  scale: { duration: 0.5 }
                }
              }}
              className="w-24 h-24 rounded-full border-6 border-t-indigo-600 border-r-indigo-600 border-b-transparent border-l-transparent flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                  transition: { repeat: Infinity, duration: 2 }
                }}
                className="w-20 h-20 rounded-full border-4 border-t-indigo-400 border-r-indigo-400 border-b-transparent border-l-transparent"
              />
            </motion.div>
            {/* Contador visual de 5 segundos */}
            <motion.div 
              className="absolute bottom-10 text-white text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span
                key={isLoading ? 'loading' : 'not-loading'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block"
              >
                Cargando... {Math.ceil(isLoading ? 5 : 0)}s
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de éxito */}
      <AnimatePresence>
        {showSuccess && (
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
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: { duration: 0.5 }
                  }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">¡Inicio de sesión exitoso!</h3>
                <p className="text-indigo-100">Redirigiendo a tu panel...</p>
              </div>
              <div className="p-6 bg-gray-50">
                <div className="flex justify-center">
                  <motion.div
                    animate={{
                      width: ['0%', '100%'],
                      transition: { duration: 2, ease: 'linear' }
                    }}
                    className="h-1 bg-indigo-200 rounded-full"
                  >
                    <div className="h-full bg-indigo-500 rounded-full" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sección del formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 relative"
        >
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 rounded-2xl z-10" />
          )}
          
          <div className="text-center mb-2">
            <div className="flex items-center justify-center mb-4">
              <img 
                src={aversiestesi}  
                alt="Logo"
                className="h-25 w-auto -mb-5"  
                style={{ maxWidth: '140px' }}  
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Bienvenido</h2>
            <p className="text-gray-600 mt-2">Inicia sesión para cuidar y conectar</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  autoComplete="username"
                  required
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Ingresa tu usuario"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="contra" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="contra"
                  name="contra"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={contra}
                  onChange={(e) => setContra(e.target.value)}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="recordarDisp"
                  name="recordarDisp"
                  type="checkbox"
                  checked={recordarDisp}
                  onChange={(e) => setRecordarDisp(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="recordarDisp" className="ml-2 block text-sm text-gray-700">
                  Recordar dispositivo
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Iniciando sesión...
                  </>
                ) : 'Iniciar sesión'}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              ¿No tienes una cuenta?{' '}
              <button 
                onClick={goToRegister}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Regístrate ahora
              </button>
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Sección de imagen */}
      <div className="hidden md:block md:w-1/2 relative">
        <img 
          src={portada2}
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-indigo-900 bg-opacity-70 flex items-center justify-center p-12">
          <div className="max-w-lg text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Conexión que cuida</h2>
            <p className="text-xl leading-relaxed mb-8">
              Creemos que el cuidado de nuestros seres queridos mayores debe ser tan sencillo como lleno de amor. 
              Con Elderly, la distancia ya no es una barrera para brindar atención, tranquilidad y cariño.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium">Seguridad garantizada</p>
                <p className="text-indigo-200 text-sm">Protegemos tus datos y privacidad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
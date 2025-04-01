import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import aversiestesi from '../assets/aversiestesi.png';
import portada3 from '../assets/portada3.jpg';

export const Register = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    correo: '',
    contra: '',
    telefono: '',
    roluser: 'usuario',
    termsAccepted: false
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fromLogin = location.state?.fromLogin;
  const initialX = fromLogin ? 50 : -50;
  const exitX = fromLogin ? -50 : 50;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.termsAccepted) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    setIsLoading(true);

    // Mostrar carga por 5 segundos
    setTimeout(async () => {
      try {
        const response = await fetch('https://api-elderly.onrender.com/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuario: formData.usuario,
            correo: formData.correo,
            contra: formData.contra,
            telefono: formData.telefono,
            roluser: formData.roluser
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error en el registro');
        }

        setShowSuccess(true);
        setIsLoading(false);
        
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error al registrar');
        setIsLoading(false);
      }
    }, 5000); // 5 segundos de carga
  };

  const goToLogin = () => {
    navigate('/login', { state: { fromRegister: true } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: exitX }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-50 relative"
    >
      {/* Overlay de carga */}
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
                    duration: 1, 
                    ease: "linear" 
                  } 
                }
              }}
              className="w-20 h-20 rounded-full border-4 border-t-indigo-600 border-r-indigo-600 border-b-transparent border-l-transparent flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                  transition: { repeat: Infinity, duration: 1.5 }
                }}
                className="w-16 h-16 rounded-full border-2 border-t-indigo-400 border-r-indigo-400 border-b-transparent border-l-transparent"
              />
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
                <h3 className="text-2xl font-bold text-white mb-2">¡Registro exitoso!</h3>
                <p className="text-indigo-100">Redirigiendo al inicio de sesión...</p>
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

      {/* Sección de imagen primero (lado izquierdo) */}
      <div className="hidden md:block md:w-1/2 relative">
        <img 
          src={portada3}
          alt="Register Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-indigo-900 bg-opacity-70 flex items-center justify-center p-12">
          <div className="max-w-lg text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Cuidado sin distancia</h2>
            <p className="text-xl leading-relaxed mb-8">
              Con Elderly, mantén el vínculo con tus seres queridos sin importar 
              dónde estés. Cada momento juntos cuenta.
            </p>
            <ul className="space-y-4 text-left max-w-md mx-auto">
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Monitoreo en tiempo real</p>
                  <p className="text-indigo-200 text-sm">Siempre informado sobre su bienestar</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Soporte inmediato</p>
                  <p className="text-indigo-200 text-sm">Asistencia cuando más la necesitas</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Seguridad garantizada</p>
                  <p className="text-indigo-200 text-sm">Protegemos tus datos y privacidad</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sección del formulario ahora en el lado derecho */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
            <h2 className="text-2xl font-semibold text-gray-800">Crea tu cuenta</h2>
            <p className="text-gray-600 mt-2">Únete a nuestra comunidad de cuidado</p>
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
                Nombre de usuario
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
                  required
                  value={formData.usuario}
                  onChange={handleChange}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Crea tu nombre de usuario"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  required
                  value={formData.correo}
                  onChange={handleChange}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Ingresa tu correo electrónico"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={handleChange}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Ingresa tu número telefónico"
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
                  required
                  value={formData.contra}
                  onChange={handleChange}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Crea una contraseña segura"
                />
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  required
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                  Acepto los{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    términos y condiciones
                  </a>{' '}
                  y la{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    política de privacidad
                  </a>
                </label>
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
                    Creando cuenta...
                  </>
                ) : 'Registrarse ahora'}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              ¿Ya tienes una cuenta?{' '}
              <button 
                onClick={goToLogin}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;
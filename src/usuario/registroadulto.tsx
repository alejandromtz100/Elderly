import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../componentes/Navbar';

interface AdultoFormData {
  nombre: string;
  edad: number;
  lim_presion: number;
  lim_tiempo_cuarto: number;
  usuario: string;
}

function RegistroAdulto() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AdultoFormData>({
    nombre: '',
    edad: 0,
    lim_presion: 0,
    lim_tiempo_cuarto: 0,
    usuario: localStorage.getItem('usuario') || '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'nombre' || name === 'usuario' ? value : Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!formData.nombre || !formData.edad || !formData.lim_presion || !formData.lim_tiempo_cuarto) {
        throw new Error('Todos los campos son requeridos');
      }

      if (formData.edad < 60) {
        throw new Error('La edad debe ser mayor o igual a 60 años');
      }

      // Mostrar carga por 5 segundos
      setTimeout(async () => {
        try {
          const response = await axios.post('https://api-elderly.onrender.com/api/registrar-adulto', formData);
          
          if (response.data.message) {
            setShowSuccess(true);
            setFormData({
              nombre: '',
              edad: 0,
              lim_presion: 0,
              lim_tiempo_cuarto: 0,
              usuario: localStorage.getItem('usuario') || '',
            });

            // Ocultar modal después de 2 segundos
            setTimeout(() => {
              setShowSuccess(false);
            }, 2000);
          }
        } catch (err: any) {
          setError(err.response?.data?.message || err.message || 'Error al registrar adulto');
        } finally {
          setIsSubmitting(false);
        }
      }, 5000); // 5 segundos de carga

    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      <Navbar />
      
      {/* Overlay de carga - 5 segundos */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -180 }}
              animate={{ 
                scale: 1,
                rotate: 0,
                transition: { 
                  rotate: { 
                    repeat: Infinity, 
                    duration: 1.5, 
                    ease: "linear" 
                  } 
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
            {/* Contador visual */}
            <motion.div 
              className="absolute bottom-10 text-white text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span
                key={isSubmitting ? 'submitting' : 'not-submitting'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block"
              >
                Registrando... {Math.ceil(isSubmitting ? 5 : 0)}s
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
              <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: { duration: 0.5 }
                  }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">¡Adulto registrado!</h3>
                <p className="text-green-100">El registro se ha completado exitosamente</p>
              </div>
              <div className="p-6 bg-gray-50">
                <div className="flex justify-center">
                  <motion.div
                    animate={{
                      width: ['0%', '100%'],
                      transition: { duration: 2, ease: 'linear' }
                    }}
                    className="h-1 bg-green-200 rounded-full"
                  >
                    <div className="h-full bg-green-500 rounded-full" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenedor principal con margen superior ajustado */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden md:max-w-2xl p-8 relative">
          {/* Botón de regresar */}
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 text-indigo-600 hover:text-indigo-800 transition-colors"
            aria-label="Regresar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Registro de Adulto Mayor</h2>
            <p className="text-gray-600">Complete el formulario para registrar un nuevo adulto mayor</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Ej: María González"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label htmlFor="edad" className="block text-sm font-medium text-gray-700">
                  Edad <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="edad"
                    name="edad"
                    min="60"
                    value={formData.edad || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Mínimo 60"
                    required
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">años</span>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="lim_presion" className="block text-sm font-medium text-gray-700">
                  Límite de presión <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="lim_presion"
                    name="lim_presion"
                    value={formData.lim_presion || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Ej: 120"
                    required
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">mmHg</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="lim_tiempo_cuarto" className="block text-sm font-medium text-gray-700">
                Tiempo máximo en cuarto <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="lim_tiempo_cuarto"
                  name="lim_tiempo_cuarto"
                  value={formData.lim_tiempo_cuarto || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Ej: 30"
                  required
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">minutos</span>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                Usuario responsable
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={formData.usuario}
                readOnly
                className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : 'Registrar Adulto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistroAdulto;
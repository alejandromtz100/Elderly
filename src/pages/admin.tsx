import React, { useState, useEffect } from "react";
import Navbar from "../componentes/NavAdmin";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiUsers, FiUser, FiDatabase, FiSettings, FiAlertCircle, FiCheckCircle, FiEdit2, FiTrash2, FiPlus, FiClock, FiActivity, FiPieChart, FiInfo, FiBell } from "react-icons/fi";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [adultos, setAdultos] = useState<any[]>([]);
  const [backupUrl, setBackupUrl] = useState<string>("");
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [loading, setLoading] = useState({
    dashboard: true,
    usuarios: true,
    adultos: true
  });

  // Obtener datos del panel de control
  useEffect(() => {
    setLoading(prev => ({ ...prev, dashboard: true }));
    fetch("https://api-elderly.onrender.com/api/panel-control")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setDashboardData(data);
          setLoading(prev => ({ ...prev, dashboard: false }));
        }, 800); // Simular tiempo de carga
      })
      .catch((err) => {
        console.error(err);
        setLoading(prev => ({ ...prev, dashboard: false }));
      });
  }, []);

  // Obtener lista de usuarios
  useEffect(() => {
    setLoading(prev => ({ ...prev, usuarios: true }));
    fetch("https://api-elderly.onrender.com/api/usuarios")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setUsuarios(data.usuarios);
          setLoading(prev => ({ ...prev, usuarios: false }));
        }, 800);
      })
      .catch((err) => {
        console.error(err);
        setLoading(prev => ({ ...prev, usuarios: false }));
      });
  }, []);

  // Obtener lista de adultos mayores
  useEffect(() => {
    setLoading(prev => ({ ...prev, adultos: true }));
    fetch("https://api-elderly.onrender.com/api/adultos")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setAdultos(data.data);
          setLoading(prev => ({ ...prev, adultos: false }));
        }, 800);
      })
      .catch((err) => {
        console.error(err);
        setLoading(prev => ({ ...prev, adultos: false }));
      });
  }, []);

  // Generar respaldo con animación de progreso
  const handleBackup = () => {
    setShowBackupModal(true);
    setBackupProgress(0);
    
    // Simular progreso
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Llamada real a la API
    fetch("https://api-elderly.onrender.com/api/backup")
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        setBackupUrl(url);
        clearInterval(interval);
        setBackupProgress(100);
      })
      .catch((err) => {
        console.error(err);
        clearInterval(interval);
      });
  };

  // Animaciones
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="p-6 pt-24 max-w-7xl mx-auto">
        {/* Pestañas de navegación mejoradas */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: "dashboard", icon: <FiActivity className="mr-2" />, label: "Panel" },
              { id: "crud", icon: <FiUsers className="mr-2" />, label: "Gestión" },
              { id: "backup", icon: <FiDatabase className="mr-2" />, label: "Respaldos" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium rounded-md transition-all flex items-center ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-blue-500 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido principal con animaciones */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            {/* Panel de Control */}
            {activeTab === "dashboard" && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <motion.h2 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-bold text-gray-800 flex items-center"
                  >
                    <FiActivity className="text-blue-500 mr-3" />
                    Panel de Control
                  </motion.h2>
                  <span className="text-sm text-gray-500">
                    Última actualización: {new Date().toLocaleString()}
                  </span>
                </div>
                
                {loading.dashboard ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                    />
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-600"
                    >
                      Cargando datos del panel...
                    </motion.p>
                  </div>
                ) : dashboardData ? (
                  <motion.div variants={stagger} initial="hidden" animate="visible">
                    {/* Estadísticas principales */}
                    <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <motion.div variants={slideUp} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-xs hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                            <FiUsers className="text-xl" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                            <p className="text-3xl font-bold text-gray-800">
                              {dashboardData.totalUsuarios}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Registrados en el sistema</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div variants={slideUp} className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-xs hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                            <FiUser className="text-xl" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Adultos Registrados</p>
                            <p className="text-3xl font-bold text-gray-800">{adultos.length}</p>
                            <p className="text-xs text-gray-500 mt-1">En seguimiento actual</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div variants={slideUp} className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100 shadow-xs hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
                            <FiSettings className="text-xl" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Roles Activos</p>
                            <p className="text-3xl font-bold text-gray-800">
                              {dashboardData.roles?.length || 0}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Tipos de usuarios</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                    
                    {/* Distribución de roles */}
                    <motion.div variants={fadeIn} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FiPieChart className="text-blue-500 mr-2" />
                        Distribución de Roles
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {dashboardData.roles?.map((role: any) => (
                          <motion.div 
                            key={role._id} 
                            variants={slideUp}
                            className="bg-white p-4 rounded-lg shadow-xs border border-gray-100 hover:shadow-md transition-shadow"
                          >
                            <p className="font-medium text-gray-700 capitalize">{role._id}</p>
                            <p className="text-2xl font-bold text-gray-800">{role.count}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <motion.div 
                                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" 
                                initial={{ width: 0 }}
                                animate={{ width: `${(role.count / dashboardData.totalUsuarios) * 100}%` }}
                                transition={{ duration: 1 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    
                    {/* Resumen y actividad */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <FiInfo className="text-blue-500 mr-2" />
                          Resumen del Sistema
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">Versión de la aplicación</span>
                            <span className="font-medium">1.0.0</span>
                          </li>
                          <li className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">Último respaldo</span>
                            <span className="font-medium">Hace 2 días</span>
                          </li>
                          <li className="flex justify-between py-2">
                            <span className="text-gray-600">Estado del servidor</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              Activo
                            </span>
                          </li>
                        </ul>
                      </motion.div>
                      
                      <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <FiBell className="text-blue-500 mr-2" />
                          Actividad Reciente
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="p-2 bg-blue-50 rounded-full mr-3">
                              <FiUser className="text-blue-500 text-sm" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Nuevo usuario registrado</p>
                              <p className="text-xs text-gray-500">Hace 30 minutos</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-2 bg-green-50 rounded-full mr-3">
                              <FiActivity className="text-green-500 text-sm" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Alerta de presión arterial</p>
                              <p className="text-xs text-gray-500">Hace 2 horas</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-2 bg-purple-50 rounded-full mr-3">
                              <FiDatabase className="text-purple-500 text-sm" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Respaldo automático completado</p>
                              <p className="text-xs text-gray-500">Ayer a las 3:00 AM</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <FiAlertCircle className="mx-auto text-3xl text-yellow-500 mb-4" />
                    <p className="text-gray-600">No se pudieron cargar los datos del panel</p>
                  </motion.div>
                )}
              </div>
            )}

            {/* Gestión de Datos */}
            {activeTab === "crud" && (
              <div className="p-6">
                <motion.h2 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
                >
                  <FiUsers className="text-blue-500 mr-2" />
                  Gestión de Datos
                </motion.h2>
                
                {/* Tabla de Usuarios */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <FiUser className="text-blue-400 mr-2" />
                      Usuarios Registrados
                    </h3>
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center"
                    >
                      <FiPlus className="mr-1" /> Nuevo Usuario
                    </motion.button>
                  </div>
                  
                  {loading.usuarios ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
                      />
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-600"
                      >
                        Cargando usuarios...
                      </motion.p>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="overflow-x-auto rounded-xl border border-gray-200 shadow-xs"
                    >
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {usuarios.map((user) => (
                            <motion.tr 
                              key={user._id} 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <FiUser className="text-blue-500" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{user.usuario}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.correo}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.telefono || '-'}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.roluser === 'admin' 
                                    ? 'bg-purple-100 text-purple-800' 
                                    : user.roluser === 'cuidador' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {user.roluser}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Activo
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-blue-500 hover:text-blue-700 mr-3">
                                  <FiEdit2 />
                                </button>
                                <button className="text-red-500 hover:text-red-700">
                                  <FiTrash2 />
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </div>
                
                {/* Tabla de Adultos Mayores */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <FiUser className="text-blue-400 mr-2" />
                      Adultos Mayores
                    </h3>
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center"
                    >
                      <FiPlus className="mr-1" /> Nuevo Adulto
                    </motion.button>
                  </div>
                  
                  {loading.adultos ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
                      />
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-600"
                      >
                        Cargando adultos mayores...
                      </motion.p>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="overflow-x-auto rounded-xl border border-gray-200 shadow-xs"
                    >
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Límite Presión</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiempo Cuarto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuidador</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {adultos.map((adulto) => (
                            <motion.tr 
                              key={adulto._id} 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <FiUser className="text-orange-500" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{adulto.nombre}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{adulto.edad}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{adulto.lim_presion || '-'}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{adulto.lim_tiempo_cuarto || '-'}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {adulto.usuario || 'No asignado'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-blue-500 hover:text-blue-700 mr-3">
                                  <FiEdit2 />
                                </button>
                                <button className="text-red-500 hover:text-red-700">
                                  <FiTrash2 />
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Gestión de Respaldos */}
            {activeTab === "backup" && (
              <div className="p-6">
                <motion.h2 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
                >
                  <FiDatabase className="text-blue-500 mr-2" />
                  Gestión de Respaldos
                </motion.h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.div 
                    variants={slideUp}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FiDownload className="text-blue-500 mr-2" />
                      Generar Respaldo
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Crea un respaldo completo de la base de datos del sistema. Este archivo contiene todos los datos 
                      de usuarios, adultos mayores y configuraciones del sistema.
                    </p>
                    <motion.button
                      onClick={handleBackup}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-md font-medium transition-all flex items-center justify-center"
                    >
                      <FiDownload className="mr-2" />
                      Generar Respaldo
                    </motion.button>
                  </motion.div>
                  
                  <motion.div 
                    variants={slideUp}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FiClock className="text-blue-500 mr-2" />
                      Historial de Respaldos
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Últimos respaldos generados del sistema:
                    </p>
                    <div className="space-y-3">
                      {[
                        { name: "backup_20230615.zip", date: "15 Jun 2023, 03:00 AM" },
                        { name: "backup_20230608.zip", date: "8 Jun 2023, 03:00 AM" },
                        { name: "backup_20230601.zip", date: "1 Jun 2023, 03:00 AM" }
                      ].map((backup, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <FiDatabase className="text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm font-medium">{backup.name}</p>
                              <p className="text-xs text-gray-500">{backup.date}</p>
                            </div>
                          </div>
                          <button className="text-blue-500 hover:text-blue-700">
                            <FiDownload />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                    <button className="mt-4 text-sm text-blue-500 hover:text-blue-700 font-medium flex items-center">
                      <FiPlus className="mr-1" /> Ver historial completo
                    </button>
                  </motion.div>
                </div>
                
                <motion.div 
                  variants={fadeIn}
                  className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                    <FiAlertCircle className="mr-2" />
                    Recomendaciones de Respaldo
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-yellow-700">
                    <li>Realiza respaldos periódicos (al menos semanales)</li>
                    <li>Guarda los archivos de respaldo en un lugar seguro</li>
                    <li>Verifica que los respaldos se puedan restaurar correctamente</li>
                    <li>Considera configurar respaldos automáticos</li>
                  </ul>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal de Respaldo */}
      <AnimatePresence>
        {showBackupModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowBackupModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiDatabase className="text-blue-500 mr-2" />
                  Generando Respaldo
                </h3>
                <button 
                  onClick={() => setShowBackupModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </div>
              
              <div className="mb-6">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${backupProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-right text-sm text-gray-500 mt-1">
                  {backupProgress}% completado
                </p>
              </div>
              
              {backupProgress === 100 ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <FiCheckCircle className="text-green-500 text-xl mr-3" />
                    <div>
                      <p className="font-medium text-green-800">Respaldo generado con éxito</p>
                      <a
                        href={backupUrl}
                        download="backup.zip"
                        className="text-blue-500 hover:underline text-sm inline-flex items-center mt-1"
                      >
                        <FiDownload className="mr-1" />
                        Descargar archivo backup.zip
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">
                  Preparando archivo de respaldo, por favor espere...
                </p>
              )}
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowBackupModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium transition-colors"
                >
                  {backupProgress === 100 ? 'Cerrar' : 'Cancelar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
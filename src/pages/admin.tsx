import React, { useState, useEffect } from "react";
import Navbar from "../componentes/NavAdmin";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [adultos, setAdultos] = useState<any[]>([]);
  const [backupLoading, setBackupLoading] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [backupMessage, setBackupMessage] = useState({ text: "", type: "" });
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
        setDashboardData(data);
        setLoading(prev => ({ ...prev, dashboard: false }));
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
        setUsuarios(data.usuarios);
        setLoading(prev => ({ ...prev, usuarios: false }));
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
        setAdultos(data.data);
        setLoading(prev => ({ ...prev, adultos: false }));
      })
      .catch((err) => {
        console.error(err);
        setLoading(prev => ({ ...prev, adultos: false }));
      });
  }, []);

  // Función para generar respaldo mejorada
  const handleBackup = () => {
    setBackupLoading(true);
    setShowBackupModal(true);
    setBackupMessage({ text: "Generando respaldo...", type: "info" });

    fetch("https://api-elderly.onrender.com/api/backup")
      .then(async (res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        
        // Verificamos el tipo de contenido
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/zip") !== -1) {
          return res.blob();
        } else {
          const errorData = await res.json();
          throw new Error(errorData.message || "Formato de respaldo no válido");
        }
      })
      .then((blob) => {
        // Crear enlace de descarga
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `backup_${new Date().toISOString().split('T')[0]}.zip`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        
        setBackupMessage({ 
          text: "Respaldo generado y descargado con éxito", 
          type: "success" 
        });
      })
      .catch((err) => {
        console.error("Error en respaldo:", err);
        setBackupMessage({ 
          text: `Error al generar respaldo: ${err.message}`,
          type: "error" 
        });
      })
      .finally(() => {
        setBackupLoading(false);
      });
  };

  // Animación de carga mejorada
  const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
    const sizes = {
      sm: "h-6 w-6",
      md: "h-10 w-10",
      lg: "h-16 w-16"
    };
    
    return (
      <div className="flex justify-center items-center">
        <div className={`animate-spin rounded-full ${sizes[size]} border-t-2 border-b-2 border-blue-500`}></div>
      </div>
    );
  };

  // Modal de respaldo
  const BackupModal = () => {
    if (!showBackupModal) return null;

    const getMessageColor = () => {
      switch (backupMessage.type) {
        case "success": return "bg-green-100 text-green-800";
        case "error": return "bg-red-100 text-red-800";
        default: return "bg-blue-100 text-blue-800";
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                <i className="fas fa-database mr-2"></i>
                Respaldo del Sistema
              </h3>
              <button 
                onClick={() => setShowBackupModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="my-6">
              {backupLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <LoadingSpinner size="lg" />
                  <p className="mt-4 text-gray-600">Preparando respaldo...</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div 
                      className="bg-blue-500 h-2 rounded-full animate-pulse" 
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className={`p-4 rounded-lg ${getMessageColor()} flex items-start`}>
                  <i className={`fas ${
                    backupMessage.type === "success" ? "fa-check-circle" :
                    backupMessage.type === "error" ? "fa-exclamation-circle" : "fa-info-circle"
                  } text-xl mr-3 mt-1`}></i>
                  <div>
                    <p className="font-medium">{backupMessage.text}</p>
                    {backupMessage.type === "success" && (
                      <p className="text-sm mt-1">
                        El archivo se ha descargado automáticamente. Guárdalo en un lugar seguro.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowBackupModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cerrar
              </button>
              {backupMessage.type === "error" && (
                <button
                  onClick={handleBackup}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
                >
                  Reintentar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Navbar importado */}
      <Navbar />
      
      {/* Contenedor principal */}
      <div className="p-6 pt-24 max-w-7xl mx-auto">
        {/* Pestañas de navegación mejoradas */}
        <div className="mb-8">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-3 font-medium rounded-t-lg transition-all relative overflow-hidden group ${
                activeTab === "dashboard"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-50"
              }`}
            >
              <span className="relative z-10 flex items-center">
                <i className="fas fa-tachometer-alt mr-2"></i>
                Panel de Control
              </span>
              {activeTab === "dashboard" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("crud")}
              className={`px-6 py-3 font-medium rounded-t-lg transition-all relative overflow-hidden group ${
                activeTab === "crud"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-50"
              }`}
            >
              <span className="relative z-10 flex items-center">
                <i className="fas fa-users-cog mr-2"></i>
                Gestión de Datos
              </span>
              {activeTab === "crud" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("backup")}
              className={`px-6 py-3 font-medium rounded-t-lg transition-all relative overflow-hidden group ${
                activeTab === "backup"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-50"
              }`}
            >
              <span className="relative z-10 flex items-center">
                <i className="fas fa-database mr-2"></i>
                Respaldos
              </span>
              {activeTab === "backup" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"></span>
              )}
            </button>
          </div>
          <div className="bg-white rounded-b-lg rounded-tr-lg shadow-md overflow-hidden">
            {/* Contenido de cada sección */}
            {activeTab === "dashboard" && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    <i className="fas fa-tachometer-alt mr-2 text-blue-500"></i>
                    Panel de Control
                  </h2>
                  <span className="text-sm text-gray-500">
                    Última actualización: {new Date().toLocaleString()}
                  </span>
                </div>
                
                {loading.dashboard ? (
                  <div className="py-12">
                    <LoadingSpinner size="lg" />
                    <p className="text-center mt-4 text-gray-600">Cargando datos del panel...</p>
                  </div>
                ) : dashboardData ? (
                  <>
                    {/* Estadísticas principales con animaciones */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center">
                          <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4 animate-pulse">
                            <i className="fas fa-users text-xl"></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                            <p className="text-3xl font-bold text-gray-800 animate-fade-in">
                              {dashboardData.totalUsuarios}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Registrados en el sistema</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center">
                          <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4 animate-pulse">
                            <i className="fas fa-user-friends text-xl"></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Adultos Registrados</p>
                            <p className="text-3xl font-bold text-gray-800 animate-fade-in">{adultos.length}</p>
                            <p className="text-xs text-gray-500 mt-1">En seguimiento actual</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center">
                          <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4 animate-pulse">
                            <i className="fas fa-user-tag text-xl"></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Roles Activos</p>
                            <p className="text-3xl font-bold text-gray-800 animate-fade-in">
                              {dashboardData.roles?.length || 0}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Tipos de usuarios</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Detalle de roles */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        <i className="fas fa-chart-pie mr-2 text-blue-500"></i>
                        Distribución de Roles
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {dashboardData.roles?.map((role: any) => (
                          <div 
                            key={role._id} 
                            className="bg-white p-4 rounded-lg shadow-xs border border-gray-100 hover:shadow-md transition-shadow"
                          >
                            <p className="font-medium text-gray-700 capitalize">{role._id}</p>
                            <p className="text-2xl font-bold text-gray-800">{role.count}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                                style={{ width: `${(role.count / dashboardData.totalUsuarios) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Resumen rápido */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          <i className="fas fa-info-circle mr-2 text-blue-500"></i>
                          Resumen del Sistema
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex justify-between py-2 border-b border-gray-100 hover:bg-gray-50 px-2 rounded transition-colors">
                            <span className="text-gray-600">Versión de la aplicación</span>
                            <span className="font-medium">1.0.0</span>
                          </li>
                          <li className="flex justify-between py-2 border-b border-gray-100 hover:bg-gray-50 px-2 rounded transition-colors">
                            <span className="text-gray-600">Último respaldo</span>
                            <span className="font-medium">Hace 2 días</span>
                          </li>
                          <li className="flex justify-between py-2 hover:bg-gray-50 px-2 rounded transition-colors">
                            <span className="text-gray-600">Estado del servidor</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full animate-pulse">
                              Activo
                            </span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          <i className="fas fa-bell mr-2 text-blue-500"></i>
                          Actividad Reciente
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="p-2 bg-blue-50 rounded-full mr-3 animate-bounce">
                              <i className="fas fa-user-plus text-blue-500 text-sm"></i>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Nuevo usuario registrado</p>
                              <p className="text-xs text-gray-500">Hace 30 minutos</p>
                            </div>
                          </div>
                          <div className="flex items-start p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="p-2 bg-green-50 rounded-full mr-3 animate-pulse">
                              <i className="fas fa-heartbeat text-green-500 text-sm"></i>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Alerta de presión arterial</p>
                              <p className="text-xs text-gray-500">Hace 2 horas</p>
                            </div>
                          </div>
                          <div className="flex items-start p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="p-2 bg-purple-50 rounded-full mr-3">
                              <i className="fas fa-database text-purple-500 text-sm"></i>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Respaldo automático completado</p>
                              <p className="text-xs text-gray-500">Ayer a las 3:00 AM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <i className="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4 animate-bounce"></i>
                    <p className="text-gray-600">No se pudieron cargar los datos del panel</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      <i className="fas fa-sync-alt mr-2"></i> Reintentar
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "crud" && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  <i className="fas fa-users-cog mr-2 text-blue-500"></i>
                  Gestión de Datos
                </h2>
                
                {/* Tabla de Usuarios */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      <i className="fas fa-users mr-2 text-blue-400"></i>
                      Usuarios Registrados
                    </h3>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      <i className="fas fa-plus mr-1"></i> Nuevo Usuario
                    </button>
                  </div>
                  
                  {loading.usuarios ? (
                    <div className="py-12">
                      <LoadingSpinner size="lg" />
                      <p className="text-center mt-4 text-gray-600">Cargando lista de usuarios...</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
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
                            <tr 
                              key={user._id} 
                              className="hover:bg-gray-50 transition-colors duration-150"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center shadow-inner">
                                    <i className="fas fa-user text-blue-500"></i>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{user.usuario}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.correo}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.telefono || '-'}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full shadow-sm ${
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
                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 shadow-sm">
                                  Activo
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-blue-500 hover:text-blue-700 mr-3 transform hover:scale-110 transition-transform">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="text-red-500 hover:text-red-700 transform hover:scale-110 transition-transform">
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                
                {/* Tabla de Adultos Mayores */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      <i className="fas fa-user-friends mr-2 text-blue-400"></i>
                      Adultos Mayores
                    </h3>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      <i className="fas fa-plus mr-1"></i> Nuevo Adulto
                    </button>
                  </div>
                  
                  {loading.adultos ? (
                    <div className="py-12">
                      <LoadingSpinner size="lg" />
                      <p className="text-center mt-4 text-gray-600">Cargando lista de adultos mayores...</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
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
                            <tr 
                              key={adulto._id} 
                              className="hover:bg-gray-50 transition-colors duration-150"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center shadow-inner">
                                    <i className="fas fa-user-tie text-orange-500"></i>
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
                                {adulto.usuario || (
                                  <span className="text-red-400">No asignado</span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-blue-500 hover:text-blue-700 mr-3 transform hover:scale-110 transition-transform">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="text-red-500 hover:text-red-700 transform hover:scale-110 transition-transform">
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "backup" && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  <i className="fas fa-database mr-2 text-blue-500"></i>
                  Gestión de Respaldos
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      <i className="fas fa-file-export mr-2 text-blue-500"></i>
                      Generar Respaldo
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Crea un respaldo completo de la base de datos del sistema. Este archivo contiene todos los datos 
                      de usuarios, adultos mayores y configuraciones del sistema.
                    </p>
                    <button
                      onClick={handleBackup}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <i className="fas fa-download mr-2"></i>
                      Generar Respaldo
                    </button>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      <i className="fas fa-history mr-2 text-blue-500"></i>
                      Historial de Respaldos
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Últimos respaldos generados del sistema:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center">
                          <i className="fas fa-file-archive text-gray-400 mr-3"></i>
                          <div>
                            <p className="text-sm font-medium">backup_20230615.zip</p>
                            <p className="text-xs text-gray-500">15 Jun 2023, 03:00 AM</p>
                          </div>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition-transform">
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center">
                          <i className="fas fa-file-archive text-gray-400 mr-3"></i>
                          <div>
                            <p className="text-sm font-medium">backup_20230608.zip</p>
                            <p className="text-xs text-gray-500">8 Jun 2023, 03:00 AM</p>
                          </div>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition-transform">
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center">
                          <i className="fas fa-file-archive text-gray-400 mr-3"></i>
                          <div>
                            <p className="text-sm font-medium">backup_20230601.zip</p>
                            <p className="text-xs text-gray-500">1 Jun 2023, 03:00 AM</p>
                          </div>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition-transform">
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
                    </div>
                    <button className="mt-4 text-sm text-blue-500 hover:text-blue-700 font-medium flex items-center">
                      <i className="fas fa-ellipsis-h mr-1"></i> Ver historial completo
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6 hover:shadow-sm transition-shadow">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    Recomendaciones de Respaldo
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-yellow-700">
                    <li className="hover:text-yellow-800 transition-colors">Realiza respaldos periódicos (al menos semanales)</li>
                    <li className="hover:text-yellow-800 transition-colors">Guarda los archivos de respaldo en un lugar seguro</li>
                    <li className="hover:text-yellow-800 transition-colors">Verifica que los respaldos se puedan restaurar correctamente</li>
                    <li className="hover:text-yellow-800 transition-colors">Considera configurar respaldos automáticos</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal de respaldo */}
      <BackupModal />
      
      {/* Agregar animaciones CSS */}
      <style  >{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
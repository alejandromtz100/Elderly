import React from "react";
import heroImage from "../assets/01.png";
import cuidadoImage from "../assets/02.png";
import cuidar from "../assets/04.png";
import appTelefono from "../assets/03.png";
import monitoreoIcon from "../assets/monitoreo.png";
import recordatoriosIcon from "../assets/recordatorios.png";
import ubicacionIcon from "../assets/ubicacion.png";
import redIcon from "../assets/red.png";
import Navbar from "../componentes/Navbar";

const Inicio: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      <Navbar />
       
     {/* Hero Section - Enhanced with gradient overlay */}
     <section id="home" className="pt-28 md:pt-44 pb-32 md:pb-48 relative overflow-hidden"
       style={{
         backgroundImage: `url(${heroImage})`,
         backgroundSize: "100% auto",
         backgroundPosition: "center 85px",
         backgroundRepeat: "no-repeat",
       }}
     >
       <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent z-0"></div>
       <div className="max-w-6xl mx-auto px-4 relative z-10">
         <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-gray-900 drop-shadow-md">Cuidando Juntos</h1>
         <h2 
           className="text-3xl md:text-5xl font-semibold mb-6 md:mb-10 text-blue-600"
           style={{ fontFamily: 'Hotline, sans-serif' }}
         >
           Transformando Vidas
         </h2>

         <div className="text-lg md:text-2xl mb-12 md:mb-20 space-y-2 md:space-y-4 text-gray-700 max-w-xl">
           <p>Elderly es la herramienta diseñada</p>
           <p>para que monitorear la salud de tus</p>
           <p>seres queridos mayores sea sencillo.</p>
         </div>
         
         {/* Enhanced buttons with hover effects */}
         <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 -ml-0 sm:-ml-4">
           <button
             type="button"
             className="flex items-center justify-center w-full sm:w-48 text-white bg-gray-900 rounded-lg h-14 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
           >
             <div className="mr-3">
               <svg viewBox="30 336.7 120.9 129.2" width="30">
                 <path
                   fill="#FFD400"
                   d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                 ></path>
                 <path
                   fill="#FF3333"
                   d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                 ></path>
                 <path
                   fill="#48FF48"
                   d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                 ></path>
                 <path
                   fill="#3BCCFF"
                   d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                 ></path>
               </svg>
             </div>
             <div>
               <div className="text-xs">GET IT ON</div>
               <div className="-mt-1 font-sans text-xl font-semibold">Google Play</div>
             </div>
           </button>
           
           <button
             type="button"
             className="flex items-center justify-center w-full sm:w-48 text-white bg-gray-900 h-14 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
           >
             <div className="mr-3">
               <svg viewBox="0 0 384 512" width="30">
                 <path
                   fill="currentColor"
                   d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                 ></path>
               </svg>
             </div>
             <div>
               <div className="text-xs">Download on the</div>
               <div className="-mt-1 font-sans text-xl font-semibold">App Store</div>
             </div>
           </button>
         </div>
       </div>
     </section>

      {/* About Section - Enhanced with floating effect */}
      <section id="nosotros" className="bg-gradient-to-br from-blue-100 to-sky-200 pt-16 md:pt-24 pb-16 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center md:justify-start md:-ml-10">
            <img
              src={cuidadoImage}
              alt="Cuidado de adultos mayores"
              className="w-full max-w-md md:max-w-3xl transform transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="md:w-1/2 md:ml-10 text-center">
            <h3 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 md:mb-8">
              <span className="text-blue-600">¿Qué es </span>
              <span className="text-blue-800" style={{ fontFamily: "Hotline, sans-serif" }}>elderly</span>
              <span className="text-blue-600">?</span>
            </h3>
            <p className="text-gray-700 text-lg md:text-2xl leading-relaxed text-justify bg-white/50 p-4 md:p-6 rounded-xl shadow-sm">
              Creemos que el cuidado de nuestros seres queridos mayores debe ser tan
              sencillo como lleno de amor. Por eso, creamos <strong className="text-blue-600">Elderly</strong>: una
              solución tecnológica que conecta a las familias con el bienestar de sus
              mayores, facilitando su cuidado diario, seguridad y comunicación, todo
              desde un solo lugar. <br /><br />
              Con <strong className="text-blue-600">Elderly</strong>, la distancia ya no es una barrera para brindar
              atención, tranquilidad y cariño.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with cards */}
      <section id="funciones" className="-mt-14 pt-5 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="block">Todo lo que necesitas</span>
              <span className="text-blue-600" style={{ fontFamily: "Hotline, sans-serif" }}>en un solo lugar</span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto">
              Descubre cómo <strong className="text-blue-600">Elderly</strong> te ayuda a monitorear, organizar y
              proteger la salud de tus seres queridos mayores.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
              <div className="relative">
                <img
                  src={appTelefono}
                  alt="App en teléfono"
                  className="max-w-[250px] md:max-w-[300px] lg:max-w-[400px] h-auto transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            <div className="lg:w-1/2 lg:pl-8">
              <div className="space-y-6 md:space-y-8">
                {/* Health Monitoring Feature */}
                <div className="flex flex-col sm:flex-row items-start p-4 md:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mr-4 sm:mr-6 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center">
                    <img
                      src={monitoreoIcon}
                      alt="Monitoreo de Salud"
                      className="w-10 h-10 sm:w-16 sm:h-16 object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Monitoreo de Salud</h3>
                    <p className="text-gray-700 mt-2 text-sm sm:text-base">
                      Consulta signos vitales clave como ritmo cardíaco, presión arterial y pasos en tiempo real. 
                    </p>
                  </div>
                </div>

                {/* Reminders Feature */}
                <div className="flex flex-col sm:flex-row items-start p-4 md:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mr-4 sm:mr-6 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center">
                    <img
                      src={recordatoriosIcon}
                      alt="Recordatorios Personalizados"
                      className="w-10 h-10 sm:w-16 sm:h-16 object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Recordatorios Personalizados</h3>
                    <p className="text-gray-700 mt-2 text-sm sm:text-base">
                      Organiza recordatorios de medicamentos, citas médicas y actividades diarias.
                    </p>
                  </div>
                </div>

                {/* Location Feature */}
                <div className="flex flex-col sm:flex-row items-start p-4 md:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mr-4 sm:mr-6 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center">
                    <img
                      src={ubicacionIcon}
                      alt="Ubicación en Tiempo Real"
                      className="w-10 h-10 sm:w-16 sm:h-16 object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Ubicación en Tiempo Real</h3>
                    <p className="text-gray-700 mt-2 text-sm sm:text-base">
                      Conoce la ubicación en vivo del adulto mayor y recibe alertas.
                    </p>
                  </div>
                </div>

                {/* Care Network Feature */}
                <div className="flex flex-col sm:flex-row items-start p-4 md:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mr-4 sm:mr-6 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center">
                    <img
                      src={redIcon}
                      alt="Red de Cuidado"
                      className="w-10 h-10 sm:w-16 sm:h-16 object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Red de Cuidado</h3>
                    <p className="text-gray-700 mt-2 text-sm sm:text-base">
                      Comparte información y tareas con familiares o cuidadores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section - Enhanced with gradient background */}
      <section id="faq" className="py-12 md:py-16 bg-gradient-to-r from-blue-50 to-sky-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center -mt-8 md:-mt-12">
            <img 
              src={cuidar}
              alt="Cuidado de adultos mayores"
              className="w-full max-w-xs md:max-w-md transform transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          <div className="md:w-1/2 md:ml-8 text-center md:pt-12">
            <h3 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              <span className="block">Cuidar es más</span>
              <span className="text-blue-600">fácil que nunca</span>
            </h3>
            <p className="text-gray-700 text-lg md:text-2xl leading-relaxed mt-4 md:mt-6 mb-6 md:mb-8 max-w-lg mx-auto">
              Descarga la app y accede a herramientas diseñadas
              para facilitar el cuidado de tus seres queridos.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 md:mt-8">
              <button
                type="button"
                className="flex items-center justify-center w-full sm:w-48 text-white bg-gray-900 rounded-lg h-14 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className="mr-3">
                  <svg viewBox="30 336.7 120.9 129.2" width="30">
                    <path
                      fill="#FFD400"
                      d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                    ></path>
                    <path
                      fill="#FF3333"
                      d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                    ></path>
                    <path
                      fill="#48FF48"
                      d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                    ></path>
                    <path
                      fill="#3BCCFF"
                      d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="-mt-1 font-sans text-xl font-semibold">Google Play</div>
                </div>
              </button>
              
              <button
                type="button"
                className="flex items-center justify-center w-full sm:w-48 text-white bg-gray-900 h-14 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className="mr-3">
                  <svg viewBox="0 0 384 512" width="30">
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="-mt-1 font-sans text-xl font-semibold">App Store</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced with floating form */}
      <section id="contacto" className="bg-gray-900 text-white py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="md:pl-8 lg:pl-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
              Estamos Aquí <br />
              <span className="text-blue-400">para Ayudarte</span>
            </h2>
            <p className="text-base md:text-lg mb-4 md:mb-6 text-gray-300 max-w-md">
              ¿Tienes dudas, sugerencias o necesitas asistencia? Nuestro equipo
              está listo para apoyarte. Contáctanos por el medio que prefieras.
            </p>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-600 flex items-center justify-center mr-3 md:mr-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-lg md:text-xl font-semibold">+52 800 123 4567</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-600 flex items-center justify-center mr-3 md:mr-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a
                  href="mailto:contacto@erdelyapp.com"
                  className="text-base md:text-lg text-blue-400 hover:text-blue-300 transition"
                >
                  contacto@erdelyapp.com
                </a>
              </div>
            </div>
          </div>

          <div className="md:mr-8 lg:mr-12">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl text-gray-900 w-full max-w-md mx-auto md:ml-auto transform transition-transform duration-300 hover:-translate-y-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Contáctanos</h3>
              <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                Nos comunicamos contigo a cualquier hora del día.
              </p>
              <form className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre"
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Apellido"
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="Correo Electrónico"
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <div className="flex">
                    <div className="relative w-24 md:w-28 mr-2">
                      <select 
                        className="block appearance-none w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 md:py-3 px-3 md:px-4 pr-6 md:pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="MX"
                      >
                        <option value="MX">🇲🇽 +52</option>
                        <option value="US">🇺🇸 +1</option>
                        <option value="CO">🇨🇴 +57</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"/>
                        </svg>
                      </div>
                    </div>
                    <input
                      type="tel"
                      placeholder="Ej. 55 1234 5678"
                      className="flex-1 px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <textarea
                    rows={4}
                    placeholder="¿En qué te podemos ayudar?"
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold px-4 py-2 md:py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                >
                  Enviar Mensaje
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  Al enviar tu mensaje, aceptas nuestros{" "}
                  <a href="#" className="text-blue-500 hover:text-blue-700 font-medium">
                    Términos y Condiciones
                  </a>{" "}
                  y nuestra{" "}
                  <a href="#" className="text-blue-500 hover:text-blue-700 font-medium">
                    Política de Privacidad
                  </a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-gray-900 text-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0 text-sm md:text-base">© 2024 Erdely. Todos los derechos reservados.</p>
          <div className="flex space-x-4 md:space-x-6">
            <a href="#" className="hover:text-blue-400 transition">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
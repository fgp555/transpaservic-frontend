import React from "react";
import "./HelpPage.css";

const HelpPage = () => {
  return (
    <div className="HelpPage">
      <header className="help-header">
        <h1>Centro de Ayuda</h1>
        <p>Encuentra información, tutoriales y guías para usar el sistema de gestión de ordenes.</p>
      </header>

      <main className="help-main">
        {/* Información del sistema */}
        <section className="help-section">
          <h2>Información del Sistema</h2>
          <p>Este sistema SaaS está diseñado para administrar y centralizar la gestión de ordenes de viajes de múltiples empresas de operador. Permite:</p>
          <ul>
            <li>Administrar ordenes de manera eficiente.</li>
            <li>Registrar y gestionar operadores.</li>
            {/* <li>Monitorear el estado de las ordenes en tiempo real.</li> */}
          </ul>
        </section>

        {/* Video tutorial */}
        <section className="help-section">
          <h2>Video Tutorial</h2>
          <p>Como vincular whatsapp con el sistema:</p>
          <div className="video-container">
            {/* <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe> */}
          </div>
        </section>

        {/* Contacto de soporte */}
        <section className="help-section">
          <h2>Contacto de Soporte</h2>
          <p>¿Tienes dudas o necesitas ayuda adicional? Contáctanos:</p>
          <ul>
            <li className="help-li-title">
              Email: <a href="mailto:soporte@systered.com">soporte@systered.com</a>
            </li>
            <li className="help-li-title">
              Web:{" "}
              <a href="https://systered.com/" target="_blank" rel="noopener noreferrer">
                https://systered.com/
              </a>
            </li>
            <li className="help-li-title">
              WhatsApp:{" "}
              <a href="https://wa.me/573114396143" target="_blank" rel="noopener noreferrer">
                3114396143
              </a>
            </li>

            <li className="help-li-title">Horario de atención:</li>
            <li>Lun-Vie 8:00 a 18:00</li>
            <li>Sab: 8:00 a 13:00</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default HelpPage;

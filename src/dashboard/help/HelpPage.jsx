import React from "react";
import "./HelpPage.css";

const HelpPage = () => {
  return (
    <div className="HelpPage">
      <header className="help-header">
        <h1>Centro de Ayuda</h1>
        <p>Encuentra información, tutoriales y guías para usar el sistema de gestión de tickets.</p>
      </header>

      <main className="help-main">
        {/* Información del sistema */}
        <section className="help-section">
          <h2>Información del Sistema</h2>
          <p>Este sistema SaaS está diseñado para administrar y centralizar la gestión de tickets de viajes de múltiples empresas de transporte. Permite:</p>
          <ul>
            <li>Registrar y gestionar empresas de transporte.</li>
            <li>Administrar rutas y tickets de manera eficiente.</li>
            <li>Generar reportes personalizados sobre el uso del sistema.</li>
            <li>Monitorear el estado de los tickets en tiempo real.</li>
          </ul>
        </section>

        {/* Video tutorial */}
        <section className="help-section">
          <h2>Video Tutorial</h2>
          <p>Sigue este tutorial en video para aprender los conceptos básicos del sistema:</p>
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Contacto de soporte */}
        <section className="help-section">
          <h2>Contacto de Soporte</h2>
          <p>¿Tienes dudas o necesitas ayuda adicional? Contáctanos:</p>
          <ul>
            <li>Email: soporte@gestiotickets.com</li>
            <li>Teléfono: +34 900 123 456</li>
            <li>Horario de atención: Lunes a Viernes, 9:00 a 18:00</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default HelpPage;

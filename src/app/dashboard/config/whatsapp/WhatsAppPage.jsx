import React from "react";
import useWablas from "./hooks/useWablas";
import "./WhatsAppConfigPage.css";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { apiBaseURL } from "../../../../utils/apiBaseURL";
import Swal from "sweetalert2"; // Para mostrar alertas

const WhatsAppConfigPage = () => {
  const { loading, error, wablas, deviceInfo } = useWablas();
  const [formData, setFormData] = React.useState({});
  const userToken = useSelector((state) => state.user?.token);

  React.useEffect(() => {
    if (wablas) {
      setFormData({
        domain: wablas.domain,
        apiKeyToken: wablas.apiKeyToken,
        secretKey: wablas.secretKey,
      });
    }
  }, [wablas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmCreate = await Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Quieres actualizar la configuración de WhatsApp?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, actualizar",
      cancelButtonText: "Cancelar",
    });
    if (!confirmCreate.isConfirmed) return;

    fetch(`${apiBaseURL}/api/wablas/update/1`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        Swal.fire({
          title: "¡Éxito!",
          text: "La configuración de WhatsApp se ha actualizado correctamente.",
          icon: "success",
          confirmButtonColor: "#28a745",
          position: "bottom-end",
          showConfirmButton: false,
          toast: true,
          timer: 3000,
          background: "#222533", // Color de fondo oscuro
          color: "#fff", // Color del texto en el modal
          customClass: {
            popup: "swal-popup-bottom-right", // Clase personalizada para el popup
          },
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (loading) return <p>Cargando configuración de WhatsApp...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="WhatsAppConfigPage">
      <h2 className="title">Configuración de WhatsApp</h2>
      <br />
      <br />
      <section>
        <aside>
          <p>
            WhatsApp: <b> {deviceInfo?.data.sender}</b>
          </p>
          <p>
            Cuota: <b> {deviceInfo?.data.quota}</b>
          </p>
          <p>
            Estado: <span className={deviceInfo?.data.status}> {deviceInfo?.data.status === "connected" ? "Conectado" : "Desconectado"}</span>
          </p>
          <br />
          {deviceInfo?.data.status === "connected" ? (
            <NavLink to={formData?.domain + "/device"} className="btn btn-primary" target="_blank">
              Desconectar
            </NavLink>
          ) : (
            <NavLink to={formData?.domain + "/device"} className="btn btn-primary" target="_blank">
              Conectar
            </NavLink>
          )}
        </aside>
        <form className="dashboard">
          <aside>
            <div>
              <label htmlFor="domain">Dominio:</label>
              <input type="text" id="domain" name="domain" value={formData?.domain} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="apiKeyToken">API Key Token:</label>
              <input type="text" id="apiKeyToken" name="apiKeyToken" value={formData?.apiKeyToken} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="secretKey">API Key Token:</label>
              <input type="text" id="secretKey" name="secretKey" value={formData?.secretKey} onChange={handleChange} />
            </div>
            <div>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Guardar
              </button>
            </div>
          </aside>
          {/* <section>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </section> */}
        </form>
      </section>
    </div>
  );
};

export default WhatsAppConfigPage;

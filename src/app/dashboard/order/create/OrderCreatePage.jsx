// import { orderService } from "../../../services/apiOperator";
// import "./OrderCreatePage.css";
import { isDevelopment } from "../../../../utils/apiBaseURL";
import { orderService } from "../../../../services/apiOrder";
import { validateOrderForm } from "./utils/validateOrderForm";
import FindMunicipalityComponent from "./components/findMunicipalityComponent";
import FindOperatorComponent from "./components/FindOperatorComponent";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { namesOrderFields } from "../../../../utils/namesFields";
import BackButtonComponent from "../../_components/Buttons/BackButtonComponent";
import { BreadcrumbsComponent } from "../../_components/BreadcrumbsComponent/BreadcrumbsComponent";

let dataDev;
if (isDevelopment) {
  dataDev = {
    operatorContract: "100002",
    orderNumber: "2000002",
    authorizationNumber: "abc",
    client: "NEPS",
    patientName: "David Lopez Mendoza",
    idCard: "79688623",
    origin: "",
    destination: "",
    itinerary: "Bucaramanga-Yopal",
    quantity: 2,
    remarks: "Testing remarks",
    // travelDate: "",
    email: "demo@example.com",
    creationDate: new Date().toISOString().split("T")[0],
    value: 60000,
    netValue: 120000,
    serviceProvider: "Motilones Operator",
    countryCode: "+57",
    userPhone: "3229650957",
    operator: { id: null },
    sendWhatsapp: false,
  };
} else {
  dataDev = {};
}

const OrderCreatePage = () => {
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [errors, setErrors] = useState({});
  // const [errors, setErrors] = useState({ origin: false, destination: false });
  const [formData, setFormData] = useState({ countryCode: "+57" });
  // const [formData, setFormData] = useState(dataDev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || "",
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined, // Reiniciar error al escribir
    }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      itinerary: `${prev.origin} - ${prev.destination}`,
    }));
  }, [formData.origin, formData.destination]); // Dependencias: se ejecuta cuando cambian origin o destination

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      netValue: prev.value * prev.quantity, // Calculamos netValue
    }));
  }, [formData.value, formData.quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos requeridos
    const newErrors = {
      operator: !formData.operator?.id, // Validar que el operador tenga un ID
      origin: !formData.origin, // Validar que haya un origen seleccionado
      destination: !formData.destination, // Validar que haya un destino seleccionado
    };

    setErrors(newErrors);

    // Si hay errores, detener el envío y mostrar alerta
    if (Object.values(newErrors).some((error) => error)) {
      Swal.fire("Error", "Por favor, completa todos los campos requeridos", "error");
      return;
    }

    // Combinar código de país y número de teléfono antes de enviar los datos
    const fullPhoneNumber = `${formData.countryCode}${formData.userPhone}`;
    const updatedFormData = { ...formData, userPhone: fullPhoneNumber };

    try {
      const response = await orderService.create(updatedFormData);
      Swal.fire("Éxito", "Order creado exitosamente", "success");
      console.log("Order creado:", response);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 409) {
          Swal.fire("Conflicto", data.message || "Entrada duplicada detectada", "error");
        } else if (status === 400) {
          Swal.fire("Error de validación", data.message || "Datos inválidos", "error");
        } else {
          Swal.fire("Error", data.message || "Error inesperado en el servidor", "error");
        }
      } else if (error.request) {
        Swal.fire("Error de red", "No se pudo contactar con el servidor. Intenta más tarde.", "error");
      } else {
        Swal.fire("Error", "Ocurrió un error inesperado", "error");
      }

      console.error("Error al crear el order:", error);
    }
  };

  const handleCitySelect = (field, city) => {
    setFormData((prev) => ({
      ...prev,
      [field]: city,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: false, // Limpiar el error cuando selecciona una ciudad
    }));
  };

  // Actualizar el operador seleccionado
  const handleOperatorSelect = (operator) => {
    setSelectedOperator(operator);
    setFormData((prev) => ({
      ...prev,
      operator: { id: operator.id },
    }));
    setErrors((prev) => ({
      ...prev,
      operator: false, // Limpiar el error al seleccionar un operador
    }));
  };

  const breadcrumbItems = [
    { label: "Ordenes", link: "/dashboard/order/list" },
    { label: "Crear Orden", link: `/dashboard/order/detail/` },
  ];

  return (
    <div className="OrderCreatePage">
      <section className="breadcrumbs-container">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <BackButtonComponent />
          <BreadcrumbsComponent items={breadcrumbItems} className="breadcrumbs" />
        </div>
      </section>
      <br />
      <h1 className="title ">Crear Orden</h1>
      <br />
      <form /* onSubmit={handleSubmit} */ className="dashboard">
        <aside className="left">
          <div>
            {/* ========== Información Básica ========== */}
            <h2 className="subtitle">Información Básica</h2>
            <br />
          </div>
          <div>
            <label htmlFor="operatorContract">{namesOrderFields.operatorContract}</label>
            <input type="text" id="operatorContract" name="operatorContract" value={formData.operatorContract} onChange={handleChange} required />
            {errors.operatorContract && <p className="error">{errors.operatorContract}</p>}
          </div>

          <div>
            <label htmlFor="orderNumber">{namesOrderFields.orderNumber}</label>
            <input type="text" id="orderNumber" name="orderNumber" value={formData.orderNumber} onChange={handleChange} required />
            {errors.orderNumber && <p className="error">{errors.orderNumber}</p>}
          </div>

          <div>
            <label htmlFor="authorizationNumber">{namesOrderFields.authorizationNumber}</label>
            <input type="text" id="authorizationNumber" name="authorizationNumber" value={formData.authorizationNumber} onChange={handleChange} required />
            {errors.authorizationNumber && <p className="error">{errors.authorizationNumber}</p>}
          </div>

          <div>
            <label htmlFor="client">{namesOrderFields.client}</label>
            <input type="text" id="client" name="client" value={formData.client} onChange={handleChange} required />
            {errors.client && <p className="error">{errors.client}</p>}
          </div>

          <div>
            <label htmlFor="patientName">{namesOrderFields.patientName}</label>
            <input type="text" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} required />
            {errors.patientName && <p className="error">{errors.patientName}</p>}
          </div>

          <div>
            <label htmlFor="idCard">{namesOrderFields.idCard}</label>
            <input type="text" id="idCard" name="idCard" value={formData.idCard} onChange={handleChange} required />
            {errors.idCard && <p className="error">{errors.idCard}</p>}
          </div>

          <div>
            <label htmlFor="countryCode">{namesOrderFields.countryCode}</label>
            <input type="text" id="countryCode" name="countryCode" placeholder="+52" value={formData.countryCode || ""} onChange={handleChange} required />
            {errors.countryCode && <p className="error">{errors.countryCode}</p>}
          </div>

          <div>
            <label htmlFor="userPhone">{namesOrderFields.userPhone}</label>
            <input type="text" id="userPhone" name="userPhone" value={formData.userPhone} onChange={handleChange} required />
            {errors.userPhone && <p className="error">{errors.userPhone}</p>}
          </div>

          <div>
            <label htmlFor="creationDate">{namesOrderFields.creationDate}</label>
            <input type="date" id="creationDate" name="creationDate" value={formData.creationDate} onChange={handleChange} required />
            {errors.creationDate && <p className="error">{errors.creationDate}</p>}
          </div>
        </aside>

        <aside className="right">
          <div>
            {/* ========== Información de Viaje ========== */}
            <h2 className="subtitle">Información de Viaje</h2>
            <br />
          </div>

          <div>
            <FindOperatorComponent onOperatorSelect={handleOperatorSelect} />
            {errors.operator && <p className="error">Debe seleccionar un operador</p>}
          </div>

          <div>
            <label>{namesOrderFields.origin}</label>
            <FindMunicipalityComponent onCitySelect={(city) => handleCitySelect("origin", city)} />
            {errors.origin && <p className="error">Debe seleccionar un municipio de origen</p>}
          </div>
          <div>
            <label>{namesOrderFields.destination}</label>
            <FindMunicipalityComponent onCitySelect={(city) => handleCitySelect("destination", city)} />
            {errors.destination && <p className="error">Debe seleccionar un municipio de destino</p>}
          </div>

          <div>
            <label htmlFor="itinerary">{namesOrderFields.itinerary}</label>
            <input type="text" id="itinerary" name="itinerary" value={formData.itinerary} onChange={handleChange} disabled />
            {errors.itinerary && <p className="error">{errors.itinerary}</p>}
          </div>

          <div>
            <label htmlFor="quantity">{namesOrderFields.quantity[1]}</label>
            <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
            {errors.quantity && <p className="error">{errors.quantity}</p>}
          </div>

          <div>
            <label htmlFor="value">{namesOrderFields.value}</label>
            <input type="number" id="value" name="value" value={formData.value} onChange={handleChange} required />
            {errors.value && <p className="error">{errors.value}</p>}
          </div>

          <div>
            <label htmlFor="netValue">{namesOrderFields.netValue}</label>
            <input type="number" id="netValue" name="netValue" value={formData.netValue} onChange={handleChange} disabled />
            {errors.netValue && <p className="error">{errors.netValue}</p>}
          </div>

          <div>
            <label htmlFor="travelDate">{namesOrderFields.travelDate}</label>
            <input type="date" id="travelDate" name="travelDate" value={formData.travelDate} onChange={handleChange} required />
            {errors.travelDate && <p className="error">{errors.travelDate}</p>}
          </div>

          <div>
            <label htmlFor="remarks">{namesOrderFields.remarks}</label>
            <textarea id="remarks" name="remarks" value={formData.remarks} onChange={handleChange}></textarea>
            {errors.remarks && <p className="error">{errors.remarks}</p>}
          </div>

          <br />
          <div>
            <button type="button" onClick={handleSubmit} className="btn btn-primary">
              Crear Orden
            </button>
            {/* <span className="send-whatsapp">
              <input type="checkbox" name="sendWhatsapp" id="sendWhatsapp" />
              <label htmlFor="sendWhatsapp"> Enviar por WhatsApp </label>
            </span> */}
          </div>
        </aside>
      </form>
      {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
    </div>
  );
};

export default OrderCreatePage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { orderService } from "../../../../services/apiOrder";
import "./OrderUpdatePage.css";
import FileUploadComp from "../../_components/FileUploadComp/FileUploadComp";

const OrderUpdatePage = () => {
  const { id } = useParams(); // Obtener el ID del order desde la URL
  const [orderData, setOrderData] = useState({
    operatorContract: "",
    orderNumber: "",
    authorizationNumber: "",
    client: "",
    patientName: "",
    idCard: "",
    origin: "",
    destination: "",
    itinerary: "",
    quantity: 1,
    remarks: "",
    travelDate: "",
    email: "",
    value: 0,
    netValue: 0,
    serviceProvider: "",
    userPhone: "",
  });

  // Cargar los datos del order al montar el componente
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const order = await orderService.getById(id); // Suponiendo que tienes un método `getById` en orderService
        setOrderData(order);
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar el order", "error");
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id]);

  // Manejar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await orderService.update(id, orderData);
      Swal.fire("Éxito", "Order actualizado exitosamente", "success");
      console.log("Order actualizado:", response);
    } catch (error) {
      Swal.fire("Error", "Hubo un error actualizando el order", "error");
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="OrderUpdatePage">
      <h2>Actualizar Orden</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="operatorContract">Contrato de operador</label>
          <input type="text" id="operatorContract" name="operatorContract" value={orderData.operatorContract} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="orderNumber">Número de orden</label>
          <input type="text" id="orderNumber" name="orderNumber" value={orderData.orderNumber} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="authorizationNumber">Autorización #</label>
          <input type="text" id="authorizationNumber" name="authorizationNumber" value={orderData.authorizationNumber} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="client">Cliente</label>
          <input type="text" id="client" name="client" value={orderData.client} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="patientName">Nombre del paciente</label>
          <input type="text" id="patientName" name="patientName" value={orderData.patientName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="idCard">ID del paciente</label>
          <input type="text" id="idCard" name="idCard" value={orderData.idCard} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="origin">Origen</label>
          <input type="text" id="origin" name="origin" value={orderData.origin} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="destination">Destino</label>
          <input type="text" id="destination" name="destination" value={orderData.destination} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="itinerary">Itinerario</label>
          <input type="text" id="itinerary" name="itinerary" value={orderData.itinerary} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="quantity">Cantidad</label>
          <input type="number" id="quantity" name="quantity" value={orderData.quantity} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="remarks">Observaciones</label>
          <textarea id="remarks" name="remarks" value={orderData.remarks} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="travelDate">Fecha de viaje</label>
          <input type="date" id="travelDate" name="travelDate" value={orderData.travelDate} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" name="email" value={orderData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="value">Valor</label>
          <input type="number" id="value" name="value" value={orderData.value} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="netValue">Valor neto</label>
          <input type="number" id="netValue" name="netValue" value={orderData.netValue} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="serviceProvider">Proveedor de servicio</label>
          <input type="text" id="serviceProvider" name="serviceProvider" value={orderData.serviceProvider} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="userPhone">Teléfono del usuario</label>
          <input type="text" id="userPhone" name="userPhone" value={orderData.userPhone} onChange={handleChange} />
        </div>
        <div>
          <p>Subir Order (solo imagenes)</p>
          <FileUploadComp />
        </div>
        <br />
        <div>
          <button type="submit">Actualizar</button>
        </div>
      </form>
    </div>
  );
};

export default OrderUpdatePage;

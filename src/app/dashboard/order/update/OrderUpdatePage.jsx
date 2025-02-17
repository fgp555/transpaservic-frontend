// import "./OrderUpdatePage.css";
import { BreadcrumbsComponent } from "../../_components/BreadcrumbsComponent/BreadcrumbsComponent";
import { namesOrderFields } from "../../../../utils/namesFields";
import { orderService } from "../../../../services/apiOrder";
import { useParams } from "react-router-dom";
import BackButtonComponent from "../../_components/Buttons/BackButtonComponent";
import FileUploadComp from "../../_components/FileUploadComp/FileUploadComp";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import FindOperatorComponent from "../create/components/FindOperatorComponent";

const OrderUpdatePage = () => {
  const { id } = useParams(); // Obtener el ID del order desde la URL
  // const [selectedOperator, setSelectedOperator] = useState(null);
  // const [errors, setErrors] = useState({});

  const [orderData, setOrderData] = useState({
    orderNumber: "",
    patientName: "",
    idCard: "",
    userPhone: "",
    itinerary: "",
    creationDate: "",
    expirationDate: "",
    travelDate: "",
    approvalDate: "",
    approvalTravelDate: "",
    ticketNumber: "",
    quantity: null,
    approvalQuantity: null,
    authorizationNumber: "",
    operatorContract: "",
    value: null,
    netValue: null,
    origin: "",
    destination: "",
    client: "",
    remarks: "",
    status: "",
    ticketImage: null,
    email: "",
    operator: "",
  });

  // Cargar los datos del order al montar el componente
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const order = await orderService.getById(id);

        // Formatear las fechas a 'YYYY-MM-DD'
        const formatDate = (date) => new Date(date).toISOString().split("T")[0];

        setOrderData({
          ...order,
          creationDate: formatDate(order.creationDate),
          approvalDate: order.approvalDate ? formatDate(order.approvalDate) : "",
          expirationDate: order.expirationDate ? formatDate(order.expirationDate) : "",
        });
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

  // Actualizar el operador seleccionado
  const handleOperatorSelect = (operator) => {
    // setSelectedOperator(operator);
    setOrderData((prev) => ({
      ...prev,
      operator: { id: operator.id },
    }));
  };

  const breadcrumbItems = [
    { label: "Ordenes", link: "/dashboard/order/list" },
    { label: "Detalles de la Orden", link: `/dashboard/order/detail/${orderData.orderNumber}` },
    { label: "Editar Orden", link: `/dashboard/order/detail/${orderData.orderNumber}` },
  ];

  return (
    <div className="OrderUpdatePage">
      <section className="breadcrumbs-container">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <BackButtonComponent />
          <BreadcrumbsComponent items={breadcrumbItems} className="breadcrumbs" />
        </div>
      </section>
      <br />
      <br />
      <h1 className="title">Actualizar Orden</h1>
      <br />
      <form onSubmit={handleSubmit} className="dashboard">
        <aside>
          <div>
            {/* ========== Información Básica ========== */}
            <h2 className="subtitle">Información Básica</h2>
          </div>
          <br />
          <div>
            <label htmlFor="operatorContract">{namesOrderFields.operatorContract}</label>
            <input type="text" id="operatorContract" name="operatorContract" value={orderData.operatorContract} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="orderNumber">{namesOrderFields.orderNumber}</label>
            <input type="text" id="orderNumber" name="orderNumber" value={orderData.orderNumber} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="authorizationNumber">{namesOrderFields.authorizationNumber}</label>
            <input type="text" id="authorizationNumber" name="authorizationNumber" value={orderData.authorizationNumber} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="client">{namesOrderFields.client}</label>
            <input type="text" id="client" name="client" value={orderData.client} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="patientName">{namesOrderFields.patientName}</label>
            <input type="text" id="patientName" name="patientName" value={orderData.patientName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="idCard">{namesOrderFields.idCard}</label>
            <input type="text" id="idCard" name="idCard" value={orderData.idCard} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="userPhone">{namesOrderFields.userPhone}</label>
            <input type="text" id="userPhone" name="userPhone" value={orderData.userPhone} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="creationDate">{namesOrderFields.creationDate}</label>
            <input type="date" id="creationDate" name="creationDate" value={orderData.creationDate} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="travelDate">{namesOrderFields.travelDate}</label>
            <input type="date" id="travelDate" name="travelDate" value={orderData.travelDate} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="expirationDate">{namesOrderFields.expirationDate}</label>
            <input type="date" id="expirationDate" name="expirationDate" value={orderData.expirationDate} onChange={handleChange} disabled />
          </div>
          <div>
            <label htmlFor="approvalDate">{namesOrderFields.approvalDate[0]}</label>
            <input type="date" id="approvalDate" name="approvalDate" value={orderData.approvalDate} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="approvalTravelDate">{namesOrderFields.approvalTravelDate[0]}</label>
            <input type="date" id="approvalTravelDate" name="approvalTravelDate" value={orderData.approvalTravelDate} onChange={handleChange} />
          </div>
        </aside>
        <aside>
          <div>
            {/* ========== Información de Viaje ========== */}
            <h2 className="subtitle">Información de Viaje</h2>
          </div>
          <br />
          <div>
            <label htmlFor="status">{namesOrderFields.status}</label>
            <select id="status" name="status" value={orderData.status} onChange={handleChange}>
              <option value="pendiente">Pendiente</option>
              <option value="aprobado">Aprobado</option>
              <option value="cancelado">Cancelado</option>
              <option value="expirado">Expirado</option>
            </select>
          </div>
          <div>
            <label htmlFor="operator">{namesOrderFields.operator}</label>
            <input type="text" id="operator" name="operator" value={orderData.operator} onChange={handleChange} />
          </div>
          <div>
            <FindOperatorComponent onOperatorSelect={handleOperatorSelect} />
          </div>
          <div>
            <label htmlFor="origin">{namesOrderFields.origin}</label>
            <input type="text" id="origin" name="origin" value={orderData.origin} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="destination">{namesOrderFields.destination}</label>
            <input type="text" id="destination" name="destination" value={orderData.destination} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="itinerary">{namesOrderFields.itinerary}</label>
            <input type="text" id="itinerary" name="itinerary" value={orderData.itinerary} onChange={handleChange} disabled />
          </div>
          <div>
            <label htmlFor="quantity">{namesOrderFields.quantity[1]}</label>
            <input type="number" id="quantity" name="quantity" value={orderData.quantity} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="approvalQuantity">{namesOrderFields.approvalQuantity[1]}</label>
            <input type="number" id="approvalQuantity" name="approvalQuantity" value={orderData.approvalQuantity} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="value">{namesOrderFields.value}</label>
            <input type="number" id="value" name="value" value={orderData.value} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="netValue">{namesOrderFields.netValue}</label>
            <input type="number" id="netValue" name="netValue" value={orderData.netValue} onChange={handleChange} disabled />
          </div>
          <div>
            <label htmlFor="remarks">{namesOrderFields.remarks}</label>
            <textarea id="remarks" name="remarks" value={orderData.remarks} onChange={handleChange} />
          </div>
          <br />
          <div>
            <button type="submit" className="btn btn-primary">
              Actualizar
            </button>
          </div>
        </aside>
      </form>
      <pre>{JSON.stringify(orderData, null, 2)}</pre>
    </div>
  );
};

export default OrderUpdatePage;

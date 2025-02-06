import "./OrderBackTicket.css";
import { BreadcrumbsComponent } from "../../_components/BreadcrumbsComponent/BreadcrumbsComponent";
import { isDevelopment } from "../../../../utils/apiBaseURL";
import { orderService } from "../../../../services/apiOrder";
import { useParams, useSearchParams } from "react-router";
import BackButtonComponent from "../../_components/Buttons/BackButtonComponent";
import FindOperatorComponent from "../create/components/FindOperatorComponent";
import OrderTableByIdComp from "./components/OrderTableByIdComp";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

let dataDev;
if (isDevelopment) {
  dataDev = {
    operator: { id: 1 },
    ticketNumber: "321654",
    travelDate: "2025-02-06",
  };
} else {
  dataDev = {};
}

const OrderBackTicket = () => {
  const { orderNumber } = useParams();
  const [orderNumberState, setOrderNumberState] = useState(orderNumber);
  const [orderData, setOrderData] = useState(null);
  const isPending = orderData?.status === "pendiente";
  const [formData, setFormData] = useState(dataDev);
  // const [selectedOperator, setSelectedOperator] = useState(null);
  const [errors, setErrors] = useState({ origin: false, destination: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  const fetchOrder = async () => {
    try {
      const order = await orderService.findOneOrderNumber(orderNumberState);
      setOrderData(order);
    } catch (error) {
      Swal.fire("Error", "No se pudo cargar el order", "error");
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderNumberState]);

  if (!orderData) {
    return (
      <div className="loading">
        <h2>Cargando...</h2>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Inicio", link: "/dashboard" },
    { label: "Ordenes", link: "/dashboard/order/list" },
    { label: "BackTiket de la Orden", link: `/dashboard/order/${orderNumber}` },
  ];

  const handleOperatorSelect = (operator) => {
    setFormData((prev) => ({
      ...prev,
      operator: { id: operator.id },
    }));
    setErrors((prev) => ({
      ...prev,
      operator: false, // Limpiar el error al seleccionar un operador
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres proceder con la creación del BackTicket?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, proceder",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) {
      return; // Si el usuario cancela, no hace nada
    }

    try {
      const response = await orderService.createBackTicket(orderNumberState, formData);
      Swal.fire("Éxito", "BackTicket creado exitosamente", "success");
      console.log("BackTicket creado:", response);
      fetchOrder();
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el BackTicket", "error");
      console.error("Error creando el BackTicket:", error);
    }
  };

  const handleDelete = async (orderId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres proceder con la eliminación del BackTicket?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, proceder",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) {
      return; // Si el usuario cancela, no hace nada
    }

    try {
      await orderService.deleteBackTicket(orderId);
      Swal.fire("Éxito", "BackTicket eliminado exitosamente", "success");
      fetchOrder();
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el BackTicket", "error");
      console.error("Error eliminando el BackTicket:", error);
    }
  };

  return (
    <div className="OrderBackTicket">
      <section className="breadcrumbs-container">
        <div>
          <BackButtonComponent />
          <BreadcrumbsComponent items={breadcrumbItems} className="breadcrumbs" />
        </div>
      </section>
      <br />
      <br />
      <h1>Detalles de la Orden</h1>
      <br />
      <section className="info-container">
        <aside>
          <OrderTableByIdComp
            orderData={orderData}
            isPending={isPending}
            setOrderId={setOrderNumberState}
            orderId={orderNumberState}
            //
          />
        </aside>
        <aside>
          <h4>Actualizar y Crear Back-Ticket</h4>
          <br />
          <form className="dashboard" action="">
            <div>
              <FindOperatorComponent onOperatorSelect={handleOperatorSelect} />
            </div>
            <div>
              <label htmlFor="">Numero de Ticket:</label>
              <input type="text" name="ticketNumber" value={formData.ticketNumber} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="">Nueva Fecha de viaje:</label>
              <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Actualizar y Crear Back-Ticket
            </button>
          </form>
          {orderData.backticketHistory && orderData.backticketHistory.length > 0 && (
            <section>
              <br />
              <br />
              <h3>Historial Back-Ticket (no aprobados)</h3>
              {orderData.backticketHistory.map((backticket, index) => (
                <table className="TableComp" key={index}>
                  <thead>
                    <tr>
                      <th>Campo</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Operador:</td>
                      <td>{backticket.operator || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Numero de Ticket: </td>
                      <td>{backticket.ticketNumber || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Fecha de viaje:</td>
                      <td>{backticket.travelDate || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>{/* <pre>{JSON.stringify(backticket, null, 2)}</pre> */}</td>
                      <td style={{ textAlign: "center" }}>
                        <button className="btn btn-danger" onClick={() => handleDelete(backticket.id)}>
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </section>
          )}
        </aside>
      </section>
    </div>
  );
};

export default OrderBackTicket;

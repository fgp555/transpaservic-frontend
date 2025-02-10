import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { orderService } from "../../../../services/apiOrder";
import Swal from "sweetalert2";
import BackButtonComponent from "../../_components/Buttons/BackButtonComponent";
import { BreadcrumbsComponent } from "../../_components/BreadcrumbsComponent/BreadcrumbsComponent";
import OrderTableByIdComp from "./components/OrderTableByIdComp";
import "./OrderByIdPage.css";
import FilePreview from "./components/FilePreview";
import FileUploadTicket from "./components/FileUploadTicket";

const OrderByIdPage = () => {
  const { orderNumber } = useParams();
  const [orderNumberState, setOrderNumberState] = useState(orderNumber);
  const [orderData, setOrderData] = useState(null);
  const isPending = orderData?.status === "pendiente";

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
    { label: "Detalles de la Orden", link: `/dashboard/order/${orderNumber}` },
  ];

  return (
    <div className="OrderByIdPage">
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
            setOrderNumberState={setOrderNumberState}
            orderNumberState={orderNumberState}
            //
          />
        </aside>
        {isPending ? (
          //
          <FileUploadTicket orderNumberState={orderNumberState} fetchOrder={fetchOrder} />
        ) : (
          <FilePreview orderData={orderData} fetchOrder={fetchOrder} />
        )}
      </section>
    </div>
  );
};

export default OrderByIdPage;

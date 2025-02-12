import React from "react";
import { orderService } from "../../../../../services/apiOrder";
import Swal from "sweetalert2"; // Para mostrar alertas

const ApprovalTravelDateComp = ({ orderNumberState, fetchOrder }) => {
  const [formState, setFormState] = React.useState({
    approvalTravelDate: "",
    orderNumber: orderNumberState,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await orderService.approvalTravelDate(formState);
      console.log(res);
      fetchOrder();

      // Mostrar notificación en la esquina inferior derecha
      Swal.fire({
        title: "¡Éxito!",
        text: "Fecha aprobada correctamente",
        icon: "success",
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000, // La notificación desaparece después de 3 segundos
        toast: true, // Activa el modo "toast"
      });
    } catch (error) {
      console.error("Error approving order:", error);

      // Mostrar notificación de error
      Swal.fire({
        title: "Error",
        text: "No se pudo aprobar la fecha",
        icon: "error",
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
    }
  };

  return (
    <>
      <form className="dashboard">
        <div>
          <label htmlFor="approvalTravelDate">Fecha real de viaje</label>
          <input type="date" id="approvalTravelDate" name="approvalTravelDate" value={formState.approvalTravelDate} onChange={handleChange} />
        </div>
        <div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Enviar
          </button>
        </div>
      </form>
    </>
  );
};

export default ApprovalTravelDateComp;

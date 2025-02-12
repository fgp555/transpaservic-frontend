import { statusOrderNames } from "../../../../utils/namesFields";

export const renderStatus = (status) => {
  const statusClasses = {
    pendiente: "pendiente",
    aprobado: "aprobado",
    cancelado: "cancelado",
    expirado: "cancelado",
  };

  return <span className={statusClasses[status] || "default"}>{statusOrderNames[status] || "Desconocido"}</span>;
};

export const formatDate = (dateString) => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatDateISO = (dateString) => {
  return dateString ? new Date(dateString).toISOString().split("T")[0] : "—";
};

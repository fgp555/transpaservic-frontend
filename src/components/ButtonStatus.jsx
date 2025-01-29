import React from "react";

const ButtonStatus = () => {
  const status1 = "pendiente";
  const status2 = "cancelado";
  const status3 = "completado";

  return <div>{status3 === "pendiente" && <button className="btn btn-primary">Pendiente</button>}</div>;
};

export default ButtonStatus;

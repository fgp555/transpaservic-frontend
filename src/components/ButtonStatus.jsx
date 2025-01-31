import React from "react";
import "./ButtonStatus.css";

const ButtonStatus = () => {
  const status1 = "pendiente";
  const status2 = "cancelado";
  const status3 = "completado";

  return (
    <div className="ButtonStatus">
      {status1 === "pendiente" && (
        <button className="btn-warning">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="5"
            height="5"
            className="dotButton"
          >
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
              fill="#CD6200"
            />
          </svg>{" "}
          <span> Pendiente</span>
        </button>
      )}
      {status2 === "cancelado" && (
        <button className="btn-danger">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="5"
            height="5"
            className="dotButton"
          >
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
              fill="#A30D11"
            />
          </svg>{" "}
          <span> Cancelado</span>
        </button>
      )}
      {status3 === "completado" && (
        <button className="btn-success">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="5"
            height="5"
            className="dotButton"
          >
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
              fill="#1F9254"
            />
          </svg>{" "}
          <span> Completado</span>
        </button>
      )}
    </div>
  );
};

export default ButtonStatus;

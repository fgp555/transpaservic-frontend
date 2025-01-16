import React, { useState } from "react";
import { transportService } from "../../../services/apiTransport";

const FindTransportComponent = ({ onTransportSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [transports, setTransports] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 2) {
      setLoading(true);
      try {
        const results = await transportService.findByName(value);
        setTransports(results); // Asignar resultados a la lista de transportes
        setHighlightedIndex(-1); // Resetear el índice resaltado
      } catch (error) {
        console.error("Error fetching transports:", error);
        setTransports([]);
      } finally {
        setLoading(false);
      }
    } else {
      setTransports([]); // Limpiar resultados si el término es menor a 3 caracteres
    }
  };

  const handleSelect = (transport) => {
    onTransportSelect(transport); // Pasar transporte seleccionado al componente padre
    setSearchTerm(transport.name); // Mostrar el nombre seleccionado en el input
    setTransports([]); // Limpiar la lista de resultados
  };

  const handleKeyDown = (e) => {
    if (transports.length === 0) return;

    if (e.key === "ArrowDown") {
      // Mover hacia abajo
      setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, transports.length - 1));
    } else if (e.key === "ArrowUp") {
      // Mover hacia arriba
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      // Seleccionar el elemento resaltado al presionar Enter
      handleSelect(transports[highlightedIndex]);
    }
  };

  return (
    <div>
      <label htmlFor="transport-search">Proveedor de Servicio</label>
      <input id="transport-search" type="text" value={searchTerm} onChange={handleSearch} onKeyDown={handleKeyDown} placeholder="Buscar proveedor" />

      {/* Mostrar lista de transportes */}
      {loading && <p>Loading...</p>}
      {transports.length > 0 && (
        <div
          style={{
            border: "1px solid #ccc",
            maxHeight: "150px",
            overflowY: "auto",
            marginTop: "5px",
            position: "absolute",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          {transports.map((transport, index) => (
            <div
              key={transport.id}
              onClick={() => handleSelect(transport)} // Seleccionar transporte al hacer clic
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor: index === highlightedIndex ? "#bde0fe" : "white", // Resaltar la opción actual
              }}
            >
              {transport.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindTransportComponent;

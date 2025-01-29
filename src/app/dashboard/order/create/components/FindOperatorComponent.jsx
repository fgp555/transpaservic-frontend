import React, { useState } from "react";
import { operatorService } from "../../../../../services/apiOperator";

const FindOperatorComponent = ({ onOperatorSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [operators, setOperators] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 2) {
      setLoading(true);
      try {
        const results = await operatorService.findByName(value);
        setOperators(results); // Asignar resultados a la lista de operadors
        setHighlightedIndex(-1); // Resetear el índice resaltado
      } catch (error) {
        console.error("Error fetching operators:", error);
        setOperators([]);
      } finally {
        setLoading(false);
      }
    } else {
      setOperators([]); // Limpiar resultados si el término es menor a 3 caracteres
    }
  };

  const handleSelect = (operator) => {
    onOperatorSelect(operator); // Pasar operador seleccionado al componente padre
    setSearchTerm(operator.name); // Mostrar el nombre seleccionado en el input
    setOperators([]); // Limpiar la lista de resultados
  };

  const handleKeyDown = (e) => {
    if (operators.length === 0) return;

    if (e.key === "ArrowDown") {
      // Mover hacia abajo
      setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, operators.length - 1));
    } else if (e.key === "ArrowUp") {
      // Mover hacia arriba
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      // Seleccionar el elemento resaltado al presionar Enter
      handleSelect(operators[highlightedIndex]);
    }
  };

  return (
    <div>
      <label htmlFor="operator-search">Proveedor de Servicio</label>
      <input id="operator-search" type="text" value={searchTerm} onChange={handleSearch} onKeyDown={handleKeyDown} placeholder="Buscar proveedor" />

      {/* Mostrar lista de operadors */}
      {loading && <p>Loading...</p>}
      {operators.length > 0 && (
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
          {operators.map((operator, index) => (
            <div
              key={operator.id}
              onClick={() => handleSelect(operator)} // Seleccionar operador al hacer clic
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor: index === highlightedIndex ? "#bde0fe" : "white", // Resaltar la opción actual
              }}
            >
              {operator.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindOperatorComponent;

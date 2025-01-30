import React, { useState } from "react";
import { dataMunicipality } from "../../../../../utils/dataMunicipality";

export const FindMunicipalityComponent = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Solo filtrar si el término de búsqueda tiene 3 o más caracteres
    if (value.length >= 2) {
      const filtered = dataMunicipality.filter((municipality) => municipality[1].toLowerCase().includes(value.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData([]); // Limpiar los resultados si no cumple con los caracteres
    }
  };

  const handleSelect = (municipality) => {
    setSearchTerm(municipality[1]); // Mostrar el municipio seleccionado en el input
    setFilteredData([]); // Limpiar los resultados
    onCitySelect(municipality[1]); // Enviar solo la ciudad seleccionada al padre
  };

  const handleKeyDown = (e) => {
    if (filteredData.length === 0) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, filteredData.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelect(filteredData[highlightedIndex]);
    }
  };

  return (
    <span>
      <input type="text" value={searchTerm} onChange={handleSearch} onKeyDown={handleKeyDown} placeholder="Buscar Municipalidad" />
      {searchTerm.length >= 2 && filteredData.length > 0 && (
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
          {filteredData.map((municipality, index) => (
            <div
              key={index}
              onClick={() => handleSelect(municipality)}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor: index === highlightedIndex ? "#bde0fe" : "white",
              }}
            >
              {municipality[1]} - {municipality[0]}
            </div>
          ))}
        </div>
      )}
    </span>
  );
};


export default FindMunicipalityComponent
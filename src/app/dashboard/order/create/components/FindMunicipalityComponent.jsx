import React, { useState, useRef, useEffect } from "react";
import { dataMunicipality } from "../../../../../utils/dataMunicipality";
import "./FindMunicipalityComponent.css";

export const FindMunicipalityComponent = ({ onCitySelect, placeholderString }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filtrar municipios basados en la búsqueda
    if (value.length >= 2) {
      const filtered = dataMunicipality.filter((municipality) => municipality[1].toLowerCase().includes(value.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData(dataMunicipality); // Si no hay búsqueda, mostrar todos
    }

    setIsDropdownOpen(true); // Siempre mantener el dropdown abierto
  };

  const handleSelect = (municipality) => {
    setSearchTerm(municipality[1]); // Mostrar el municipio seleccionado en el input
    setFilteredData([]); // Limpiar los resultados
    onCitySelect(municipality[1]); // Enviar solo la ciudad seleccionada al padre
    setIsDropdownOpen(false);
  };

  const handleInputClick = () => {
    setIsDropdownOpen(true);
    setFilteredData(dataMunicipality); // Asegurar que la lista se muestra completa
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

  // Cerrar el dropdown al hacer clic fuera del input o dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target) && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Cierra el dropdown si se hace clic fuera
      }
    };

    // Agregar listener para detectar clics fuera
    document.addEventListener("mousedown", handleClickOutside);

    // Eliminar listener cuando el componente se desmonte
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <span className="FindMunicipalityComponent">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onClick={handleInputClick} // Asegurar que siempre abra la lista
        onKeyDown={handleKeyDown}
        placeholder={placeholderString}
        ref={inputRef}
        // onClick={() => setIsDropdownOpen(true)} // Mostrar la lista al hacer clic
      />

      {isDropdownOpen && (
        <span ref={dropdownRef} className="dropdown-list">
          {(searchTerm.length >= 2 ? filteredData : dataMunicipality).map((municipality, index) => (
            <div key={index} className={`dropdown-item ${index === highlightedIndex ? "highlighted" : ""}`} onClick={() => handleSelect(municipality)}>
              {municipality[1]} - {municipality[0]}
            </div>
          ))}
        </span>
      )}
    </span>
  );
};

export default FindMunicipalityComponent;

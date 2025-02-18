import "./FindOperatorComponent.css"; // Importar estilos
import { namesOrderFields } from "../../../../../utils/namesFields";
import { operatorService } from "../../../../../services/apiOperator";
import React, { useState, useRef, useEffect } from "react";

const FindOperatorComponent = ({ onOperatorSelect, placeholderString }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [operators, setOperators] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Función para obtener todos los operadores
  const fetchAllOperators = async () => {
    setLoading(true);
    try {
      const results = await operatorService.findByName("");
      setOperators(results);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error("Error fetching operators:", error);
      setOperators([]);
    } finally {
      setLoading(false);
    }
  };

  // Manejar búsqueda dinámica
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 2) {
      setLoading(true);
      try {
        const results = await operatorService.findByName(value);
        setOperators(results);
        setIsDropdownOpen(true);
        setHighlightedIndex(-1);
      } catch (error) {
        console.error("Error fetching operators:", error);
        setOperators([]);
      } finally {
        setLoading(false);
      }
    } else {
      setOperators([]);
      setIsDropdownOpen(false);
    }
  };

  // Manejar selección de operador
  const handleSelect = (operator) => {
    onOperatorSelect(operator);
    setSearchTerm(operator.name);
    setOperators([]);
    setIsDropdownOpen(false);
  };

  // Mostrar la lista solo al hacer clic
  const handleInputClick = () => {
    if (!isDropdownOpen) {
      fetchAllOperators();
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
    <div className="FindOperatorComponent">
      <label htmlFor="operator-search">{namesOrderFields.operator}</label>
      <input
        id="operator-search"
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onClick={handleInputClick}
        ref={inputRef}
        placeholder={placeholderString}
        //
      />

      {/* Dropdown de operadores */}
      <div ref={dropdownRef} className={`operator-dropdown ${isDropdownOpen ? "open" : ""}`}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          operators.map((operator, index) => (
            <div
              key={operator.id}
              className={`operator-item ${index === highlightedIndex ? "highlighted" : ""}`}
              onClick={() => handleSelect(operator)}
              //
            >
              {operator.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FindOperatorComponent;

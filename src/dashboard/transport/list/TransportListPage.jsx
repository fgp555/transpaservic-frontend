import React, { useState, useEffect } from "react";
import { transportService } from "../../../services/apiTransport";
import TransportTableComponent from "./TransportTableComponent";

const TransportListPage = () => {
  const initialFilters = {
    search: "",
    page: 1,
    limit: 10, // Cantidad de elementos por página
  };

  const [transportData, setTransportData] = useState({
    results: [],
    total: 0,
    totalPages: 1,
  });
  const [filters, setFilters] = useState(initialFilters);

  const getAllTransport = async () => {
    try {
      const response = await transportService.getAll(filters.search, filters.page, filters.limit);
      setTransportData(response);
    } catch (error) {
      console.error("Error fetching transport data:", error);
    }
  };

  useEffect(() => {
    getAllTransport();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  const handleClearSearch = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: "", // Limpiar la búsqueda
      page: 1, // Restablecer a la primera página
    }));
  };

  const handleLimitChange = (e) => {
    const newLimit = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      limit: newLimit, // Actualiza el límite de resultados
      page: 1, // Reinicia a la primera página cuando cambia el límite
    }));
  };

  const renderPagination = () => {
    const pages = Array.from({ length: transportData.totalPages }, (_, i) => i + 1);

    return (
      <div>
        <p>
          Página {filters.page} de {transportData.totalPages}
        </p>
        <button disabled={filters.page <= 1} onClick={() => handlePageChange(filters.page - 1)}>
          Anterior
        </button>
        {pages.map((page) => (
          <button key={page} onClick={() => handlePageChange(page)} disabled={filters.page === page}>
            {page}
          </button>
        ))}
        <button disabled={filters.page >= transportData.totalPages} onClick={() => handlePageChange(filters.page + 1)}>
          Siguiente
        </button>
      </div>
    );
  };

  return (
    <div>
      <h2>Lista de Operadores</h2>

      {/* Mostrar el total de elementos encontrados */}
      <h1>Elementos encontrados: {transportData.total}</h1>

      {/* Buscador */}
      <input type="text" name="search" placeholder="Buscar transporte" value={filters.search} onChange={handleFilterChange} className="border p-2" />

      {/* Botón Limpiar Búsqueda */}
      <button onClick={handleClearSearch} className="ml-2 p-2 border bg-gray-200">
        Limpiar Búsqueda
      </button>

      {/* Input para cambiar el límite */}
      <div className="mt-2">
        <label htmlFor="limit" className="mr-2">
          Límite por página:
        </label>
        <input type="number" id="limit" name="limit" value={filters.limit} onChange={handleLimitChange} className="border p-2 w-20" min="1" />
      </div>

      {/* Tabla */}
      <TransportTableComponent transportData={transportData} />

      {/* Paginación */}
      {renderPagination()}
    </div>
  );
};

export default TransportListPage;

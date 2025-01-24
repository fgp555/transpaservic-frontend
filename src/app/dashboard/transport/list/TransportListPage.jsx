import React, { useState, useEffect } from "react";
import { transportService } from "../../../../services/apiTransport";
import { TransportTableRespoComp } from "./components/TransportTableRespoComp";
import "./TransportListPage.css";

const TransportListPage = () => {
  const initialFilters = {
    search: "",
    page: 1,
    limit: 10, // Cantidad de elementos por página
  };

  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

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
      setTotal(response.total);
      setTotalPages(response.totalPages);
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
      page: name === 'search' ? 1 : prevFilters.page, // Restablece la página a 1 si el campo de búsqueda cambia
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
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 1) return null; // Si hay solo una página, no se muestra la paginación

    return (
      <div className="renderPagination">
        <button disabled={filters.page <= 1} onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}>
          Anterior
        </button>
        {pages.map((page) => (
          <button key={page} className={filters.page === page ? "active" : ""} onClick={() => setFilters((prev) => ({ ...prev, page }))}>
            {page}
          </button>
        ))}
        <button disabled={filters.page >= totalPages} onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}>
          Siguiente
        </button>
      </div>
    );
  };

  return (
    <div className="TransportListPage">
      <h1>Lista de Operadores</h1>
      <br />
      <form>
        {/* Mostrar el total de elementos encontrados */}
        <section className="filters">
          {/* Buscador */}
          <input type="text" name="search" placeholder="Buscar..." value={filters.search} onChange={handleFilterChange} className="border p-2" />

          {/* Input para cambiar el límite */}
          <input type="number" id="limit" name="limit" value={filters.limit} onChange={handleLimitChange} className="border p-2 w-20" min="1" />
          {/* Botón Limpiar Búsqueda */}
          <button onClick={handleClearSearch} className="ml-2 p-2 border bg-gray-200">
            Limpiar Búsqueda
          </button>
        </section>
        <p>{transportData.total} Operadores encontrados</p>
      </form>
      {/* <pre>{JSON.stringify(transportData, null, 2)}</pre> */}
      <TransportTableRespoComp data={transportData} fetchTransports={getAllTransport} />
      {renderPagination()}
    </div>
  );
};

export default TransportListPage;

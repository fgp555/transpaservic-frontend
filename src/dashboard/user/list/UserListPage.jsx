import React, { useState, useEffect } from "react";
import { apiUserService } from "../../../services/apiUser";
import { transportService } from "../../../services/apiTransport";
import UserTableComponent from "./UserTableComponent";

const UserListPage = () => {
  const initialFilters = {
    role: "",
    transport: "",
    page: 1,
    limit: 5, // Cantidad de elementos por página
    search: "",
  };

  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [transportData, setTransportData] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const getAllTransport = async () => {
    const response = await transportService.getAll(); // Obtención de transportes
    setTransportData(response);
  };

  useEffect(() => {
    getAllTransport(); // Llamada para obtener los datos de transporte
  }, []);

  const handleClearFilters = () => {
    setFilters(initialFilters); // Restablece los filtros al estado inicial
  };

  const fetchUsers = async () => {
    try {
      const data = await apiUserService.getAllUsers(filters); // Petición con los filtros
      if (data && Array.isArray(data.results)) {
        setUsers(data.results);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } else {
        setUsers([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchUsers(); // Obtención de los usuarios según los filtros
  }, [filters]);

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div>
        <p>
          Página {filters.page} de {totalPages}
        </p>
        <button disabled={filters.page <= 1} onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}>
          Anterior
        </button>
        {pages.map((page) => (
          <button key={page} onClick={() => setFilters((prev) => ({ ...prev, page }))} disabled={filters.page === page}>
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
    <div>
      <h1>Lista de Usuarios</h1>
      <h2>Elementos encontrados: {total}</h2>

      <form>
        {/* Búsqueda */}
        <input type="text" name="search" placeholder="Buscar por nombre o correo" value={filters.search} onChange={handleFilterChange} />

        {/* Rol */}
        <select name="role" value={filters.role} onChange={handleFilterChange}>
          <option value="">Todos los roles</option>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        {/* Transporte */}
        <select name="transport" value={filters.transport} onChange={handleFilterChange}>
          <option value="">Todos los transportes</option>
          {transportData?.results?.map((transport) => (
            <option key={transport.id} value={transport.id}>
              {transport.name}
            </option>
          ))}
        </select>

        {/* Limitar resultados */}
        <input type="number" name="limit" value={filters.limit} onChange={handleFilterChange} min="1" max="100" placeholder="Límite de resultados" />

        {/* Limpiar filtros */}
        <button type="button" onClick={handleClearFilters}>
          Limpiar filtros
        </button>
      </form>

      {/* Tabla de Usuarios */}
      <UserTableComponent users={users} />

      {/* Paginación */}
      {renderPagination()}
    </div>
  );
};

export default UserListPage;

import React, { useState, useEffect } from "react";
import { apiUserService } from "../../../../services/apiUser";
import { operatorService } from "../../../../services/apiOperator";
import { UserTableRespoComp } from "./components/UserTableRespoComp";
import "./UserListPage.css";

const UserListPage = () => {
  const initialFilters = {
    role: "",
    operator: "",
    page: 1,
    limit: 24, // Cantidad de elementos por página
    search: "",
  };

  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [operatorData, setOperatorData] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
      page: name === "search" ? 1 : prevFilters.page, // Restablece la página a 1 si el campo de búsqueda cambia
    }));
  };

  const getAllOperator = async () => {
    const response = await operatorService.getAll(); // Obtención de operadors
    setOperatorData(response);
  };

  useEffect(() => {
    getAllOperator(); // Llamada para obtener los datos de operador
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
    <div className="UserListPage">
      <h1>Lista de Usuarios</h1>
      <br />
      <form className="dashboard">
        {/* Búsqueda */}
        <input type="text" name="search" placeholder="Buscar por nombre o correo o operador" value={filters.search} onChange={handleFilterChange} />
        <section className="filters">
          {/* Rol */}
          <select name="role" value={filters.role} onChange={handleFilterChange}>
            <option value="">Todos los roles</option>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>

          {/* Operador */}
          <select name="operator" value={filters.operator} onChange={handleFilterChange}>
            <option value="">Todos los operadores</option>
            {operatorData?.results?.map((operator) => (
              <option key={operator.id} value={operator.id}>
                {operator.name}
              </option>
            ))}
          </select>

          {/* Limitar resultados */}
          <input type="number" name="limit" value={filters.limit} onChange={handleFilterChange} min="1" max="100" placeholder="Límite de resultados" />

          {/* Limpiar filtros */}
          <button type="button" onClick={handleClearFilters} className="btn btn-primary">
            Limpiar filtros
          </button>
        </section>
      </form>
      <span>{total} Usuarios encontrados</span>
      <br />
      <br />
      <UserTableRespoComp data={users} fetchUsers={fetchUsers} />

      {renderPagination()}
    </div>
  );
};

export default UserListPage;

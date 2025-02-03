import React, { useState, useEffect } from "react";
import { orderService } from "../../../../services/apiOrder";
import { useSelector } from "react-redux";
import { OrderTableRespoComp } from "./_components/OrderTableRespoComp";
import "./OrderListPage.css";
import { downloadCSV } from "./utils/downloadCSV";
import "jspdf-autotable"; // Para generar tablas automáticamente
import { downloadPDF } from "./utils/downloadPDF";
import { useOperators } from "./hooks/useOperators";
import { renderPaginationComp } from "./_components/renderPagination";

const OrderListPage = () => {
  const userSlice = useSelector((state) => state.user);
  const isAdmin = userSlice?.user?.role === "admin";
  const operatorSelect = isAdmin ? "" : userSlice?.user?.operator?.id;
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const initialFilters = {
    status: "",
    operator: operatorSelect,
    page: 1,
    limit: 5, // Cantidad de elementos por página
    search: "",
    dateFrom: "",
    dateTo: "",
  };
  const [filters, setFilters] = useState(initialFilters);

  const { operatorData, operatorLoading, operatorError } = useOperators();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
      page: name === "search" ? 1 : prevFilters.page, // Restablece la página a 1 si el campo de búsqueda cambia
    }));
  };

  const handleClearFilters = () => {
    setFilters(initialFilters); // Restablece los filtros al estado inicial
  };

  const fetchOrders = async () => {
    try {
      const data = await orderService.getOrders(filters);
      if (data && Array.isArray(data.results)) {
        setOrders(data.results);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } else {
        setOrders([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchOrders();
    console.log("fetchOrders");
  }, [filters, userSlice.user.role]);

  useEffect(() => {
    if (isAdmin) {
      // Para admin, no filtrar por operador
      setFilters((prevFilters) => ({
        // ...prevFilters,
        operator: "", // Sin filtro específico
      }));
    } else {
      // Para usuarios no admin, filtrar por el operador del usuario
      setFilters((prevFilters) => ({
        // ...prevFilters,
        operator: userSlice.user.operator?.id, // ID del operador asociado al usuario
        // operator: 1, // ID del operador asociado al usuario
      }));
    }
  }, [userSlice.user.role, userSlice.user.operator]);

  return (
    <div className="OrderListPage">
      {/* <pre>{JSON.stringify(userSlice.user, null, 2)}</pre> */}
      <h1>
        Gestión de Ordenes
        <span>{!isAdmin && <span> de {userSlice?.user?.operator?.name}</span>}</span>
      </h1>
      <br />
      <form>
        {/* Búsqueda */}
        <input type="text" name="search" placeholder="Buscar por: orden, cliente, itinerario, paciente..." value={filters.search} onChange={handleFilterChange} />

        <section className="filters">
          {/* Estado */}
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">Todos los estados</option>
            <option value="pendiente">vigente-pendiente</option>
            <option value="aprobado">aprobado</option>
            <option value="cancelado">cancelado</option>
          </select>

          {isAdmin && (
            <>
              {/* Operador */}
              <select name="operator" value={filters.operator} onChange={handleFilterChange}>
                <option value="">Todos los Operadores</option>
                {operatorData?.results?.map((operator) => (
                  <option key={operator.id} value={operator.id}>
                    {operator.name}
                  </option>
                ))}
              </select>
            </>
          )}
          {/* Fecha Desde */}
          <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} />

          {/* Fecha Hasta */}
          <input type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} />

          {/* Cantidad de elementos por página */}
          <input
            type="number"
            name="limit"
            placeholder="Cantidad por página"
            value={filters.limit}
            min="1"
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                limit: Math.max(1, parseInt(e.target.value, 10) || 1), // Asegura que sea un número válido
              }))
            }
          />

          <button type="button" onClick={handleClearFilters}>
            Limpiar
          </button>
          <button type="button" onClick={() => downloadCSV(orders)}>
            CSV
          </button>
          <button type="button" onClick={() => downloadPDF(orders, userSlice)}>
            PDF
          </button>
        </section>
        <p>{total} Ordenes encontradas</p>
      </form>

      <OrderTableRespoComp data={orders} fetchOrders={fetchOrders} />

      {renderPaginationComp(totalPages, filters, setFilters)}
    </div>
  );
};

export default OrderListPage;

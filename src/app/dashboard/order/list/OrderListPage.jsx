import "./OrderListPage.css";
import "jspdf-autotable"; // Para generar tablas automáticamente
import { downloadCSV } from "./utils/downloadCSV";
import { downloadPDF } from "./utils/downloadPDF";
import { orderService } from "../../../../services/apiOrder";
import { OrderTableRespoComp } from "./_components/OrderTableRespoComp";
import { renderPaginationComp } from "./_components/renderPagination";
import { useOperators } from "./hooks/useOperators";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

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
    limit: 20, // Cantidad de elementos por página
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
  }, [filters, userSlice.user?.role]);

  useEffect(() => {
    if (isAdmin) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        operator: "", // Sin filtro específico
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        operator: userSlice.user?.operator?.id, // ID del operador asociado al usuario
      }));
    }
  }, [isAdmin]);

  return (
    <div className="OrderListPage">
      {/* <pre>{JSON.stringify(userSlice, null, 2)}</pre> */}
      <h1>
        Gestión de Ordenes
        <span>{!isAdmin && <span> de {userSlice?.user?.operator?.name}</span>}</span>
      </h1>
      {/* <br /> */}
      <form>
        <section className="filters_top">
          {/* Búsqueda */}
          <input
            //
            type="text"
            name="search"
            placeholder="Buscar por: orden, cliente, itinerario, paciente..."
            value={filters.search}
            onChange={handleFilterChange}
            className="search-input"
          />
          {/* Cantidad de elementos por página */}

          <button className="btn btn-primary" type="button" onClick={handleClearFilters}>
            {/* Limpiar */}
            <i className="fa-solid fa-rotate-right"></i>
          </button>
          <button className="btn btn-primary" type="button" onClick={() => downloadCSV(orders)}>
            {/* CSV */}
            <i className="fa-solid fa-file-csv"></i>
          </button>
          <button className="btn btn-primary" type="button" onClick={() => downloadPDF(orders, userSlice)}>
            {/* PDF */}
            <i className="fa-solid fa-file-pdf"></i>
          </button>
        </section>
        <section className="filters">
          {/* Estado */}
          <select name="status" className="OrderStatusTable" value={filters.status} onChange={handleFilterChange}>
            <option value="">Todos los estados</option>
            <option value="pendiente" className="pendiente">
              pendiente
            </option>
            <option value="aprobado" className="aprobado">
              cumplido
            </option>
            <option value="cancelado" className="cancelado">
              cancelado
            </option>
            <option value="expirado" className="expirado">
              expirado
            </option>
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
          {/* Estado */}
          {/* <select name="status">
            <option value="">Todos</option>
            <option value="pendiente">Con back-ticket</option>
          </select> */}
          {/* Fecha Desde */}
          <input
            //
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
          />

          {/* Fecha Hasta */}
          <input
            //
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="limit"
            placeholder="Cantidad por página"
            value={filters.limit}
            min="1"
            style={{ width: "5rem" }}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                limit: Math.max(1, parseInt(e.target.value, 10) || 1), // Asegura que sea un número válido
              }))
            }
          />
        </section>
        <section>
          <span>{total} Ordenes encontradas | </span>
          <span className="OrderStatusTable OrderStatusFlex">
            <span className="pendiente">
              <i class="fa-solid fa-stopwatch pendiente"></i> pendiente
            </span>
            <span className="aprobado">
              <i class="fa-solid fa-circle-check aprobado"></i> cumplido
            </span>
            <span className="cancelado">
              <i class="fa-solid fa-ban cancelado"></i> cancelado
            </span>
            <span className="expirado">
              <i class="fa-solid fa-power-off"></i> expirado
            </span>
          </span>
          <br />
          <br />
        </section>
      </form>

      {/* {renderPaginationComp(totalPages, filters, setFilters)}
      <br /> */}

      <OrderTableRespoComp data={orders} fetchOrders={fetchOrders} />

      {renderPaginationComp(totalPages, filters, setFilters)}
    </div>
  );
};

export default OrderListPage;

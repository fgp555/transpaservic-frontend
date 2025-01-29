export const renderPagination = () => {
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

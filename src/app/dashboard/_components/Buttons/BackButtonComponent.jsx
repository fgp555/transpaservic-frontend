// import "./BackButtonComponent.css";

const BackButtonComponent = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <button onClick={handleBackClick} className="BackButtonComponent btn btn-primary">
      Volver Atrás
    </button>
  );
};

export default BackButtonComponent;

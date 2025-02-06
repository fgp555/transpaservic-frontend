// import "./BackButtonComponent.css";

import { useNavigate } from "react-router";

const BackButtonComponent = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/dashboard/order/list");
  };

  return (
    <button onClick={handleBackClick} className="BackButtonComponent btn btn-primary">
      <i className="fa-solid fa-arrow-left"></i> Atrás
    </button>
  );
};

export default BackButtonComponent;

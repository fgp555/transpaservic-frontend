import React, { useEffect, useState } from "react";
import { transportService } from "../../../services/apiTransport";

const TransportListPage = () => {
  const [transportData, setTransportData] = useState([]);

  const getAllTranport = async () => {
    const response = await transportService.getAll();
    setTransportData(response);
  };
  useEffect(() => {
    getAllTranport();
  }, []);
  return (
    <div>
      <h2>TransportListPage</h2>
      <pre>{JSON.stringify(transportData, null, 2)}</pre>
    </div>
  );
};

export default TransportListPage;

import { useState, useEffect } from "react";
import { operatorService } from "../../../../../services/apiOperator";

export const useOperators = () => {
  const [operatorData, setOperatorData] = useState([]);
  const [operatorLoading, setOperatorLoading] = useState(false);
  const [operatorError, setOperatorError] = useState(null);

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        setOperatorLoading(true);
        const response = await operatorService.getAll();
        setOperatorData(response ? response : []); // Asegura que sea un array
      } catch (error) {
        setOperatorError(error);
      } finally {
        setOperatorLoading(false);
      }
    };

    fetchOperators();
  }, []);

  return { operatorData, operatorLoading, operatorError };
};

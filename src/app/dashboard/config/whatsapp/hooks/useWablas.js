import { useState, useEffect } from "react";
import { apiBaseURL } from "../../../../../utils/apiBaseURL";
import { useSelector } from "react-redux";

const useWablas = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wablas, setWablas] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);

  const userToken = useSelector((state) => state.user?.token);

  useEffect(() => {
    if (!userToken) {
      setError("Faltan la URL de la API o el token");
      setLoading(false);
      return;
    }

    const fetchWablasData = async () => {
      try {
        const response = await fetch(`${apiBaseURL}/api/wablas/findOne/1`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos de Wablas");
        }

        const wablasData = await response.json();
        setWablas(wablasData);

        // Ahora que tenemos los datos de Wablas, usamos su información para la segunda petición
        if (wablasData?.apiKeyToken && wablasData?.domain) {
          fetchDeviceInfo(wablasData.apiKeyToken, wablasData.domain);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchDeviceInfo = async (apiKeyToken, domain) => {
      try {
        const url = `${domain}/api/device/info?token=${apiKeyToken}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener la información del dispositivo");
        }

        const deviceData = await response.json();
        setDeviceInfo(deviceData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWablasData();
  }, [userToken]);

  return { loading, error, wablas, deviceInfo };
};

export default useWablas;

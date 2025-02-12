import { useEffect, useState } from "react";
import { authService } from "../services/apiAuth";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, removeUser } from "../store/userSlice";

const useValidateToken = () => {
  const userToken = useSelector((state) => state.user?.token);
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      if (!userToken) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await authService.refreshAccessToken();
        if (response?.newAccessToken) {
          setIsAuthenticated(true);
          dispatch(refreshToken(response?.newAccessToken));
        } else {
          setIsAuthenticated(false);
          dispatch(removeUser());
        }
      } catch (err) {
        console.log("Error en validación:", err.message || "Error desconocido");
        dispatch(removeUser());
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, [userToken, dispatch]);

  return isAuthenticated; // Puede devolver null, true o false
};

export default useValidateToken;

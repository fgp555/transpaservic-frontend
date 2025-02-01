import { apiBaseURL } from "../utils/apiBaseURL";
import axios from "axios";

// Crear una instancia de Axios con la apiBaseURL
const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Función para agregar el prefijo 57 al número de teléfono si tiene 10 dígitos
function agregarPrefijo(numero) {
  if (numero.length === 10) {
    return "57" + numero;
  }
  return numero; // Si no tiene 10 dígitos, devuelve el número original
}

// Implementación del servicio
export const orderService = {
  /* 
  
  POST http://localhost:3000/api/order/save-array-data
Content-Type: application/json

{
  "data": [
    {
      "operatorContract": 573229650957,
      "orderNumber": 573229650957,
      "authorizationNumber": 1234,
      "client": "NEPS",
      "patientName": "Abel Fernandez",
      "idCard": 28428866,
      "userPhone": 3229650957,
      "email": 0,
      "creationDate": "2024-01-12",
      "origin": "SUAITA",
      "destination": "SOCORRO",
      "itinerary": "SUAITA-SOCORRO",
      "travelDate": "2024-03-05",
      "quantity": 1,
      "value": 0,
      "netValue": 0,
      "remarks": "Transsander TTRC-144037-38-39-40-45-46-47-48-49-50-51-52 / 03-03-2024",
      "operator": "COPETRAN",
      "sendWhatsApp": false
    },
    {
      "operatorContract": 51918221790,
      "orderNumber": 51918221790,
      "authorizationNumber": 1234,
      "client": "NEPS",
      "patientName": "Beatriz Rodriguez",
      "idCard": 28428866,
      "userPhone": 51918221790,
      "email": 0,
      "origin": "SUAITA",
      "destination": "SOCORRO",
      "itinerary": "SUAITA-SOCORRO",
      "travelDate": "2024-03-05",
      "quantity": 1,
      "value": 0,
      "netValue": 0,
      "remarks": "Transsander TTRC-144037-38-39-40-45-46-47-48-49-50-51-52 / 03-03-2024",
      "operator": "COOTRANSUNIDOS"
    },
    {
      "operatorContract": 573114396143,
      "orderNumber": 573114396143,
      "authorizationNumber": 1234,
      "client": "NEPS",
      "patientName": "Carlos Perez",
      "idCard": 28428866,
      "userPhone": 3114396143,
      "email": 0,
      "origin": "SUAITA",
      "destination": "SOCORRO",
      "itinerary": "SUAITA-SOCORRO",
      "travelDate": "2024-03-05",
      "quantity": 1,
      "value": 0,
      "netValue": 0,
      "remarks": "Transsander TTRC-144037-38-39-40-45-46-47-48-49-50-51-52 / 03-03-2024",
      "operator": "COTAXI"
    }
  ]
}
  
*/
  async saveArrayData(arrayData) {
    try {
      // Transformar los números de teléfono y verificar si es necesario agregar el prefijo 57
      const dataConPrefijos = arrayData.map((item) => {
        item.userPhone = agregarPrefijo(item.userPhone.toString()); // Asegurarse de que el número es una cadena
        return item;
      });

      // Enviar la solicitud POST al backend
      const response = await api.post("/api/order/save-array-data", { data: dataConPrefijos });
      return response.data; // Retornar la respuesta del backend
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      if (error.response) {
        // Si hay un error en la respuesta del servidor
        return { error: error.response.data.message || "Error desconocido" };
      }
      return { error: "Error de conexión al servidor" }; // Si no hay respuesta del servidor
    }
  },

  async approveOrder(formData) {
    try {
      const response = await api.post("/api/order/approve", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error approving order:", error);
      throw error;
    }
  },

  // saveFilteredData
  async saveFilteredData(data) {
    console.log("data", data);
    try {
      const response = await api.post("/api/order/save-filtered-data", data);
      return response.data; // En caso de éxito, devuelve los datos
    } catch (error) {
      // Asegurarse de que el error tenga la estructura esperada
      if (error.response && error.response.data) {
        // Verificamos si la respuesta tiene duplicados
        const { message, duplicates } = error.response.data;
        if (duplicates) {
          throw {
            message: message || "Se han detectado entradas duplicadas",
            duplicates: duplicates,
          };
        }
        // Si no hay duplicados, simplemente lanzamos el error con el mensaje
        throw new Error(message || "Error desconocido al guardar los datos");
      } else {
        throw new Error("Error desconocido al guardar los datos");
      }
    }
  },

  async getOrders(filters) {
    try {
      const { status, operator, page = 1, limit = 10, search, dateFrom, dateTo } = filters;

      // Construir la URL con parámetros dinámicos
      const params = new URLSearchParams();

      if (status) params.append("status", status);
      if (operator) params.append("operator", operator);
      if (search) params.append("search", search);
      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);
      if (dateFrom) params.append("dateFrom", dateFrom); // Agregar dateFrom si existe
      if (dateTo) params.append("dateTo", dateTo); // Agregar dateTo si existe

      // Realizar la solicitud GET con los filtros
      const response = await api.get(`/api/order?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get("/api/order");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  create: async (orderData) => {
    try {
      const response = await api.post("/api/order", orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/api/order/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },

  update: async (id, orderData) => {
    try {
      const response = await api.patch(`/api/order/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/order/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },
};

import React, { useState, useEffect } from "react";
import "./UserListPage.css";
import { apiUserService } from "../../../services/apiUser";

const UserListPage = () => {
  // Estado para almacenar los usuarios
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para cargar los usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await apiUserService.getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        setError("Error fetching users");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Si hay un error, mostrarlo
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Si los datos están cargando, mostrar un mensaje de carga
  if (loading) {
    return <div className="loading-message">Loading users...</div>;
  }

  return (
    <div className="UserListPage">
      <h1>User List</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>

      {/* <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default UserListPage;

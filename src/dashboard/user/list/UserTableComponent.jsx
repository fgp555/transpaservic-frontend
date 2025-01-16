// src/dashboard/user/list/UserTableComponent.jsx

import React from "react";
import "./UserTableComponent.css";

const UserTableComponent = ({ users }) => {
  return (
    <table className="UserTableComponent">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Celular</th>
          <th>Operador</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
            </td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.whatsapp}</td>
            <td>{user.transport ? user.transport.name : "No transport assigned"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTableComponent;

import React from "react";
import { Link } from "react-router-dom";

const UserTable = ({ onSortColumn, users }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th
            scope="col"
            style={{ cursor: "pointer" }}
            onClick={() => onSortColumn("name")}
          >
            Name
          </th>
          <th
            scope="col"
            style={{ cursor: "pointer" }}
            onClick={() => onSortColumn("email")}
          >
            Email
          </th>
          <th
            scope="col"
            style={{ cursor: "pointer" }}
            onClick={() => onSortColumn("website")}
          >
            Website
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.email}</td>
            <td>{user.website}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;

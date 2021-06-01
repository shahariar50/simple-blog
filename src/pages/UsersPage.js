import React from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const UsersPage = () => {
  const { users } = React.useContext(UserContext);
  return (
    <div className="py-4">
      <div className="container">
        <h3 className="pb-2">Users List</h3>
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Website</th>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

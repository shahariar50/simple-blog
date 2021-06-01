import React from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import _ from "lodash";
import UserTable from "./userpage/UserTable";

const UsersPage = () => {
  const [sortCondition, setSortCondition] = React.useState({
    path: "name",
    order: "asc",
  });
  const { users } = React.useContext(UserContext);

  const sortColumn = (path) => {
    const obj = {};
    if (sortCondition.path === path) {
      obj.order = sortCondition.order === "asc" ? "desc" : "asc";
    } else {
      obj.path = path;
      obj.order = "asc";
    }
    setSortCondition({ ...sortCondition, ...obj });
  };

  const sortedUsers = _.orderBy(
    users,
    [sortCondition.path],
    [sortCondition.order]
  );
  return (
    <div className="py-4">
      <div className="container">
        <h3 className="pb-2">Users List</h3>
        <div className="row">
          <div className="col-12">
            <UserTable onSortColumn={sortColumn} users={sortedUsers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

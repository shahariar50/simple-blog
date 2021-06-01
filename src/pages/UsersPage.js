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
  const [searchValue, setSearchValue] = React.useState("");
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

  console.log(users[0]?.name.toLowerCase().replace(/\s/g, ""));

  const searchedData = users.filter((user) =>
    `${user.name.toLowerCase().replace(/\s/g, "")}${user.email
      .toLowerCase()
      .replace(/\s/g, "")}${user.website
      .toLowerCase()
      .replace(/\s/g, "")}`.includes(
      searchValue.toLowerCase().replace(/\s/g, "")
    )
  );
  const sortedUsers = _.orderBy(
    searchedData,
    [sortCondition.path],
    [sortCondition.order]
  );
  return (
    <div className="py-4">
      <div className="container">
        <h3 className="pb-2">Users List</h3>
        <div className="form-group">
          <input
            type="email"
            placeholder="Search..."
            className="form-control"
            name="search"
            value={searchValue ? searchValue : ""}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
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

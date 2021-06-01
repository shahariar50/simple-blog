import React from "react";
import UserContext from "../context/UserContext";
import _ from "lodash";
import UserTable from "./userpage/UserTable";
import UserTablePagination from "./userpage/UserTablePagination";

const UsersPage = () => {
  const [sortCondition, setSortCondition] = React.useState({
    path: "name",
    order: "asc",
  });
  const [searchValue, setSearchValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(3);
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

  const fiteredPginatedUsers = _(sortedUsers)
    .slice((currentPage - 1) * itemsPerPage)
    .take(itemsPerPage)
    .value();

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
            <UserTable onSortColumn={sortColumn} users={fiteredPginatedUsers} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <UserTablePagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={sortedUsers.length}
            />
          </div>
          <div className="col-sm-2">
            <div className="form-group">
              <select
                className="form-control"
                onChange={(e) => setItemsPerPage(e.target.value)}
              >
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={sortedUsers.length}>All</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

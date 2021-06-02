import React from "react";
import UserContext from "../context/UserContext";
import _ from "lodash";
import UserTable from "./userpage/UserTable";
import UserTablePagination from "./userpage/UserTablePagination";
import {
  getUserTablesCurrentPage,
  getUserTablesItemsPerPage,
  getUserTablesSearchValue,
  getUserTablesSortCondition,
  setUserTablesCurrentPage,
  setUserTablesItemsPerPage,
  setUserTablesSearchValue,
  setUserTablesSortCondition,
} from "../utils/userUtils";

const UsersPage = () => {
  const [sortCondition, setSortCondition] = React.useState(
    JSON.parse(getUserTablesSortCondition()) || {
      path: "name",
      order: "asc",
    }
  );
  const [searchValue, setSearchValue] = React.useState(
    getUserTablesSearchValue() || ""
  );
  const [currentPage, setCurrentPage] = React.useState(
    Number(getUserTablesCurrentPage()) || 1
  );
  const [itemsPerPage, setItemsPerPage] = React.useState(
    Number(getUserTablesItemsPerPage()) || 3
  );

  React.useEffect(() => {
    setUserTablesSortCondition(sortCondition);
    setUserTablesSearchValue(searchValue);
    setUserTablesCurrentPage(currentPage);
    setUserTablesItemsPerPage(itemsPerPage);
  }, [sortCondition, searchValue, currentPage, itemsPerPage]);

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

  const handleChangeTotalItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
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
    [sortCondition?.path],
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
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
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
          {itemsPerPage && (
            <div className="col-sm-2">
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={handleChangeTotalItemsPerPage}
                  value={itemsPerPage}
                >
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={sortedUsers.length}>All</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

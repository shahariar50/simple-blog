import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";

const UserTablePagination = ({
  setCurrentPage,
  currentPage,
  totalItems,
  itemsPerPage,
}) => {
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
        >
          <Link to="#" className="page-link">
            Previous
          </Link>
        </li>
        {_.range(1, totalItems / itemsPerPage + 1).map((id) => (
          <li
            className={`page-item ${currentPage === id && "active"}`}
            key={id}
          >
            <Link to="#" className="page-link">
              {id}
            </Link>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage >= totalItems / itemsPerPage ? "disabled" : ""
          }`}
        >
          <Link
            to="#"
            className="page-link"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserTablePagination;

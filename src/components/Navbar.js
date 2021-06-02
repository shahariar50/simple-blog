import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navbar = () => {
  const location = useHistory();
  const [path, setPath] = React.useState(location.location.pathname);

  // Execute and active the path state when user click any nav item.
  const handleActiveLink = () => {
    console.log(location);
    setPath(location?.location.pathname);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Simple Blog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li
              className={`nav-item ${path === "/" ? "active" : ""}`}
              onClick={handleActiveLink}
            >
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li
              className={`nav-item ${path === "/users" ? "active" : ""}`}
              onClick={handleActiveLink}
            >
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
            <li
              className={`nav-item ${path === "/profile" ? "active" : ""}`}
              onClick={handleActiveLink}
            >
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

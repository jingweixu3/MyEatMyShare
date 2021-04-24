import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({userLoggedIn}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link className="navbar-brand" to="/">
          WeEatWeShare
        </Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="/ExploreNearby">
              ExploreNearBy <span className="sr-only">(current)</span>
            </Link>

          </li>
          <li className="nav-item active">
            {!userLoggedIn && <a class="nav-link" href="/auth/google">Login with google</a>}
            {userLoggedIn && <a class="nav-link" href="/api/logout">Logout</a>}
          </li>
          <li className="nav-item active">
            {userLoggedIn && <a class="nav-link" href="/api/current_user">My acoount</a>}
          </li>
          <li className="nav-item">
            <a
              className="nav-link disabled"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
            >
              Disabled
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

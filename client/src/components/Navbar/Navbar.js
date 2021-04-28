import React from "react";
import { Link } from "react-router-dom";

<link href="navbar.css" rel="stylesheet" type="text/css" />;

const Navbar = ({ userLoggedIn, userInfo }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark "
      style={{ height: "55px" }}
    >
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

        <ul
          className="nav-nav"
          style={{ float: "right", listStyleType: "none" }}
        >
          <li className="nav-item">
            <div
              id="imgDiv"
              style={{ paddingTop: "10px", marginRight: "-5px" }}
            >
              {userLoggedIn && userInfo !== null && userInfo.avatar === "" && (
                <a className="nav-link" href="/profile">
                  <img src="https://www.shareicon.net/data/40x40/2016/08/05/806962_user_512x512.png" />
                </a>
              )}
            </div>
            <div
              id="imgDiv"
              style={{ paddingTop: "10px", marginRight: "-5px" }}
            >
              {userLoggedIn && userInfo !== null && userInfo.avatar !== "" && (
                <a className="nav-link" href="/profile">
                  <img src={userInfo.avatar} />
                </a>
              )}
            </div>
          </li>
        </ul>
        <ul
          className="nav-nav "
          style={{ listStyleType: "none", paddingTop: "10px" }}
        >
          <li className="nav-item active">
            {!userLoggedIn && (
              <a className="nav-link" href="/auth/google">
                Login with google
              </a>
            )}
            {userLoggedIn && (
              <a className="nav-link" href="/api/logout">
                Logout
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

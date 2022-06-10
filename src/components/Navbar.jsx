/* jshint ignore:start */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();
  let location = useLocation();

  const path = location.pathname;

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    Navigate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            INotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link
                className={`nav-link ${path === "/" ? "active" : null}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
              <Link
                className={`nav-link ${path === "/about" ? "active" : null}`}
                to="/about"
              >
                About
              </Link>

              {!localStorage.getItem('token') ? <><Link className="btn btn-light mx-2 my-2" to="/login">
                Login
              </Link><Link className="btn btn-light mx-2 my-2" to="/signup">
                  signUp
                </Link></>:<button className="btn btn-danger mx-2" onClick={handleLogout}>LogOut</button>}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

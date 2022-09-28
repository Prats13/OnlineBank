import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={`/Home/${props.user}`}>
              <h5 className="home text-white">Home</h5>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;

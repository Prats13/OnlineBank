import React from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";

const Welcome = (props) => {
  return (
    <>
      <div className="welcform">
        <center>
          <img
            src="https://thumbs.dreamstime.com/b/bank-building-icon-isolated-black-background-bank-building-icon-isolated-black-background-simple-vector-logo-161293296.jpg"
            alt=""
            className="logo_bank"
          />
        </center>
        <center>
          <h1>Welcome to Great Bank</h1>
        </center>

        <ul className="tab-group">
          <li className="tab active">
            <Link to="/signup">Sign Up</Link>
          </li>
          <li className="tab">
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Welcome;

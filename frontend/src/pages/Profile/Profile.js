import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import axios from "axios";

const Profile = (props) => {
  const params = useParams();
  const acc = params.id.toString();

  // const [profile, setProfile] = useState({ mail: "", mobile: "", Country: "" });

  const [validAcc, setvalidAcc] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/account/")
      .then((res) => {
        setvalidAcc(res.data);
      })
      .catch((err) => {
        console.log("Error from getting the user details: " + err.message);
      });
    const found = validAcc.find((obj) => {
      return obj.AccountNo === acc;
    });
    console.log(found);
  });


  return (
    <div className="container">
      {" "}
      <div className="card">
        {" "}
        <div className="info">
          {" "}
          <span>Edit form</span> <button id="savebutton">edit</button>{" "}
        </div>{" "}
        <div className="inputs">
          {" "}
           <h5>Name: Pratyush</h5>{" "}
           <label>{props.user}</label>
        </div>{" "}
        <div className="forms">
          {" "}
          <div className="inputs">
            {" "}
            <span>Email</span>{" "}
            <input type="text" readonly value="pratyushpatra13@gmail.com" />{" "}
          </div>{" "}
          <div className="inputs">
            {" "}
            <span>Registered Mobile No.</span>{" "}
            <input type="number" readonly value="9612276838" />{" "}
          </div>{" "}
          <div className="inputs">
            {" "}
            <span>Account Number</span>{" "}
            <input type="text" readonly value="J4Z0rGXe7C" />{" "}
          </div>{" "}
          <div className="inputs">
            {" "}
            <span>Country</span> <input type="text" readonly value="India" />{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
};
export default Profile;

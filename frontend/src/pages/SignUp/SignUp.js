import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = (props) => {
  let Navigate = useNavigate();
  const [newUserData, setnewUserData] = useState({
    name: "",
    pass: "",
    email: "",
    phone: "",
    country: "",
    pin: "",
  });
  const handleRegisterChange = (event, param) => {
    switch (param) {
      case "name":
        setnewUserData({ ...newUserData, name: event.target.value });
        // console.log(newUserData.name); [for checking]
        break;
      case "pass":
        setnewUserData({ ...newUserData, pass: event.target.value });
        break;
      case "email":
        setnewUserData({ ...newUserData, email: event.target.value });
        break;
      case "phone":
        setnewUserData({ ...newUserData, phone: event.target.value });
        break;
      case "country":
        setnewUserData({ ...newUserData, country: event.target.value });
        break;
      case "pin":
        setnewUserData({ ...newUserData, pin: event.target.value });
        break;
    }
  };
  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const handleSignUp = () => {
    const acNo = makeid(10);
    const acc_details = {
      userName: newUserData.name,
      CurrBalance: 5000,
      pin: parseInt(newUserData.pin),
      AccountNo: acNo,
      MobileNo: parseInt(newUserData.phone),
      Email: newUserData.email,
      Country: newUserData.country,
    };
    const log_data = {
      userName: newUserData.name,
      password: newUserData.pass,
      AccountNo: acNo,
    };
    axios
      .post("http://localhost:5000/api/account", acc_details)
      .then((res) => {
        {
          props.setAlarm("You have Successfully signed in!!", "success");
        }
      })
      .catch((err) => {
        console.log("Error in Creating User Account!" + err.message);
      });
    console.log(log_data);
    axios
      .post("http://localhost:5000/api/login", log_data)
      .then((res) => {
        {
          props.storeUser(log_data.userName, log_data.AccountNo);
        }
        Navigate(`/Home/${log_data.AccountNo}`);
      })
      .catch((err) => {
        console.log("Error in Creating Login!" + err.message);
      });
  };
  return (
    <>
      <div className="signUpcontainer">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label htmlFor="name">
          <b>Name</b>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={newUserData.name}
          onChange={(event) => handleRegisterChange(event, "name")}
          required
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          name="psw"
          id="psw"
          value={newUserData.pass}
          onChange={(event) => handleRegisterChange(event, "pass")}
          required
        />

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={newUserData.email}
          onChange={(event) => handleRegisterChange(event, "email")}
          required
        />

        <label htmlFor="phone">
          <b>Phone</b>
        </label>
        <input
          type="number"
          name="phone"
          id="phone"
          value={newUserData.phone}
          onChange={(event) => handleRegisterChange(event, "phone")}
          required
        />

        <label htmlFor="country">
          <b>Country</b>
        </label>
        <input
          type="text"
          name="country"
          id="country"
          value={newUserData.country}
          onChange={(event) => handleRegisterChange(event, "country")}
          required
        />

        <label htmlFor="pin">
          <b>PIN</b>
        </label>
        <input
          type="number"
          name="pin"
          id="pin"
          value={newUserData.pin}
          onChange={(event) => handleRegisterChange(event, "pin")}
          required
        />
        <hr />

        <p>
          By creating an account you agree to our{" "}
          <a href="#">Terms & Privacy</a>.
        </p>
        <button className="registerbtn" onClick={handleSignUp}>
          Register
        </button>
      </div>

      <div className="container signin">
        <p>
          Already have an account? <Link to="/login">Sign in</Link>.
        </p>
      </div>
    </>
  );
};
export default SignUp;

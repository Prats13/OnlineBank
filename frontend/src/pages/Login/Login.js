import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = (props) => {
  let Navigate = useNavigate();

  const [userData, setuserData] = useState({ name: "", pass: "", acc: "" });
  const [validData, setvalidData] = useState([]);

  const handleLoginChange = (event, param) => {
    switch (param) {
      case "name":
        setuserData({ ...userData, name: event.target.value });
        break;
      case "pass":
        setuserData({ ...userData, pass: event.target.value });
        break;
      case "acc":
        setuserData({ ...userData, acc: event.target.value });
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/login")
      .then((res) => {
        setvalidData(res.data);
      })
      .catch((err) => {
        console.log("Error from getting the user details: " + err.message);
      });
  });
  var count = 0;
  // Existing User
  const handleCheck = () => {
    const login_data = {
      userName: userData.name,
      password: userData.pass,
      AccountNo: userData.acc,
    };
    for (var i = 0; i < validData.length; i++) {
      if (login_data.AccountNo === validData[i].AccountNo) {
        if (validData[i].userName === login_data.userName) {
          if (validData[i].password === login_data.password) {
            {
              props.setAlarm(
                "You have been logged in successfully!! ",
                "success"
              );
            }
            {
              props.storeUser(login_data.userName, login_data.AccountNo);
            }
            Navigate(`/Home/${login_data.AccountNo}`);
            count += 1;
          }
        }
      }
    }
    if (count === 0) {
      {
        props.setAlarm("Invalid Credentials !! ", "error");
      }
    } else {
      count = 0;
    }
  };

  return (
    // login-page -> ap
    <>
      <div className="Login_Container">
        <div className="login_page">
          <div className="login_form">
            <div className="title">Sign In For Existing Users</div>
            <div className="form">
              <form>
                <div className="input-container">
                  <label>Username </label>
                  <input
                    type="text"
                    name="uname"
                    id="uname"
                    value={userData.name}
                    onChange={(event) => {
                      handleLoginChange(event, "name");
                    }}
                    required
                  />
                </div>
                <div className="input-container">
                  <label>Password </label>
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    value={userData.pass}
                    onChange={(event) => {
                      handleLoginChange(event, "pass");
                    }}
                    required
                  />
                </div>
                <div className="input-container">
                  <label>Account No. </label>
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    value={userData.acc}
                    onChange={(event) => {
                      handleLoginChange(event, "acc");
                    }}
                    required
                  />
                </div>
              </form>
              <button onClick={handleCheck}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

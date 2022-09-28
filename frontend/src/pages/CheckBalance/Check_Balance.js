import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Withdraw/Withdraw.css";

const Check_Balance = (props) => {
  // ................................ 1st part
  const [isValidated, setIsValidated] = useState(false);

  const [Spin, setSpin] = useState({ pin: "" });
  const [foundOb, setFoundOb] = useState([]);
  const [validAcc, setvalidAcc] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/account")
      .then((res) => {
        setvalidAcc(res.data);
      })
      .catch((err) => {
        console.log("Error from getting the user details: " + err.message);
      });
  });
  const handlePinChnage = (event) => {
    setSpin({ ...Spin, pin: event.target.value });
  };
  const handleValidation = () => {
    const found = validAcc.find((obj) => {
      if (obj.pin === parseInt(Spin.pin)) {
        {
          props.setAlarm("Validation Successful!!", "success");
        }
        setIsValidated(true);
        return obj;
      } else {
        setSpin({ ...Spin, pin: "" });
        {
          props.setAlarm("Please Try Again!!", "error");
        }
      }
    });
    setFoundOb(found);
    console.log(foundOb.CurrBalance);
  };
  const renderValidationForm = (
    <div className="login-form">
      <div className="title">Enter Your PIN</div>
      <div className="form">
        <form>
          <div className="input-container">
            <label>Enter Your PIN </label>
            <input
              type="number"
              name="uname"
              value={Spin.pin}
              onChange={handlePinChnage}
              required
            />
          </div>
        </form>
        <button onClick={handleValidation}>Validate</button>
      </div>
    </div>
  );
  const renderBalanceInfo = (
    <div className="form">
      <form>
        <div className="input-container">
          <label>The Current Balance is: {foundOb.CurrBalance}</label>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="title">Welcome {props.user}!!</div>
      {isValidated ? renderBalanceInfo : renderValidationForm}
    </div>
  );
};
export default Check_Balance;

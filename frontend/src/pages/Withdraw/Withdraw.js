import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Withdraw.css";

const Withdraw = (props) => {
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
  };
  //..............................2nd Part
  const [amount, setAmount] = useState({ amt: "" });
  const handleAmtChange = (event) => {
    setAmount({ ...amount, amt: event.target.value });
  };
  const handleTransaction = () => {
    if (parseInt(amount.amt) < foundOb.CurrBalance) {
      foundOb.CurrBalance = foundOb.CurrBalance - parseInt(amount.amt);
      const acc_Data = {
        userName: foundOb.userName,
        CurrBalance: foundOb.CurrBalance,
        pin: foundOb.pin,
      };
      axios
        .put("http://localhost:5000/api/account/" + foundOb._id, acc_Data)
        .then((res) => {
          console.log("Successfully Edited!!");
          {props.setAlarm("Sucessful Withdrawl!!","success")};
        })
        .catch((err) => {
          console.log("Error in Updating Account Info!" + err.message);
        });
    } else {
      {
        props.setAlarm("Your Current Balance is Low!!", "error");
      }
    }
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
  const renderWithdrawProcess = (
    <div className="form">
      <form>
        <div className="input-container">
          <label>Enter the amount to withdraw</label>
          <input
            type="number"
            name="uname"
            required
            value={amount.amt}
            onChange={handleAmtChange}
          />
        </div>
        <br />
        <div className="input-container">
          <label>The Current Balance is: {foundOb.CurrBalance}</label>
        </div>
      </form>
      <button onClick={handleTransaction}>Transact</button>
    </div>
  );

  return (
    <div className="app">
      <div className="title">Welcome {props.user}!!</div>
      {isValidated ? renderWithdrawProcess : renderValidationForm}
    </div>
  ); 
};
export default Withdraw;

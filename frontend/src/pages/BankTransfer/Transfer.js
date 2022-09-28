import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Withdraw/Withdraw.css";

const Transfer = (props) => {
  const params = useParams();
  const sender_acc = params.id.toString();

  const [amt, setAmt] = useState({ amount: "" ,reciever:"",name:""});
  const handleAmountChange = (event) => {
    setAmt({ ...amt, amount: event.target.value });
  };
  const handleAccNoChange = (event) => {
    setAmt({ ...amt, reciever: event.target.value });
  };
  const handleNameChange = (event) => {
    setAmt({ ...amt, name: event.target.value });
  };

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

  const handleTransfer = () => {
    const send = validAcc.find((obj) => {
      return obj.AccountNo === sender_acc;
    });
    if (send.CurrBalance > parseInt(amt.amount)) {
      send.CurrBalance = send.CurrBalance - parseInt(amt.amount);
    }
    else{
        {props.setAlarm("Insufficient Balance!!","error")};
        return;
    }
    axios
      .put("http://localhost:5000/api/account/" + send._id, send)
      .then((res) => {
        console.log("Successfully Edited!!");
      })
      .catch((err) => {
        console.log("Error in Updating Account Info!" + err.message);
      });
    const recieve=validAcc.find((obj)=>{
        return obj.AccountNo === amt.reciever;
    });
    recieve.CurrBalance+=parseInt(amt.amount);
    axios
      .put("http://localhost:5000/api/account/" + recieve._id, recieve)
      .then((res) => {
        console.log("Successfully Edited!!");
        {props.setAlarm("Sucessful Transaction!!","success")};
      })
      .catch((err) => {
        console.log("Error in Updating Account Info!" + err.message);
      });
  };
  return (
    <>
      <div className="form">
        <form>
          <div className="input-container">
            <label>Enter the Name of the reciever</label>
            <input
              type="text"
              name="uname"
              required
              value={amt.name}
              onChange={handleNameChange}
            />
          </div>
          <br />
          <div className="input-container">
            <label>Enter the Account No. of the reciever</label>
            <input
              type="text"
              name="reciever"
              required
              value={amt.reciever}
              onChange={handleAccNoChange}
            />
          </div>
          <br />
          <div className="input-container">
          <label>Enter the amount to deposit</label>
          <input
            type="number"
            name="uname"
            required
            value={amt.amount}
            onChange={handleAmountChange}
          />
        </div>
        </form>
        <button onClick={handleTransfer}>Transact</button>
      </div>
    </>
  );
};
export default Transfer;

import "./home.css";

import React from "react";
import Cards from "../props/Cards";
import { useParams } from "react-router-dom";

const Home = (props) => {
  const params = useParams();
  const _id = params.id.toString();
  return (
    <div className="container">
      <Cards title="Withdraw" imageDir="withdraw" linked={`/Withdraw/${_id}`}/>
      <Cards title="Deposit" imageDir="deposit" linked={`/Deposit/${_id}`}/>
      <Cards title="Check Balance" imageDir="check_balance" linked={`/CheckBalance/${_id}`}/>
      <Cards title="Profile" imageDir="profile" linked={`/Profile/${_id}`}/>
      <Cards title="Bank Transfer" imageDir="transfer" linked={`/Transfer/${_id}`}/>
      <Cards title="New Account + " imageDir="new_acc" linked="/signup"/>
    </div>
  );
};
export default Home;

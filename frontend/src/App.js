import "./App.css";

import Login from "./pages/Login/Login";
import Alerts from "./props/Alerts";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Deposit from "./pages/Deposit/Deposit";
import Withdraw from "./pages/Withdraw/Withdraw";
import Check_Balance from "./pages/CheckBalance/Check_Balance";
import Profile from "./pages/Profile/Profile";
import Welcome from "./pages/Welcome/Welcome";
import SignUp from "./pages/SignUp/SignUp";
import Transfer from "./pages/BankTransfer/Transfer";

function App() {
  const [alert, setAlert] = useState(null);
  const setAlarm = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const [user,setUser]=useState({uname:"",accNo:""});
  const storeUser= (name,num) =>{
    setUser({...user,uname:name});
    setUser({...user,accNo:num});
  }
  // const [status,setStatus]=useState({type:""});
  // const storeStatus= (name) =>{
  //   setStatus({...status,type:name});
  // }
  return (
    <Router>
      <Alerts alert={alert} />
      <Routes>
        {/* <Route exact path="/" element={<><Login setAlarm={setAlarm} storeUser={storeUser} storeNewUser={storeNewUser}/></>} /> */}
        <Route exact path="/" element={<><Welcome /></>} />
        <Route exact path="/signup" element={<><SignUp setAlarm={setAlarm} storeUser={storeUser}/></>} />
        <Route exact path="/login" element={<><Login setAlarm={setAlarm} storeUser={storeUser}/></>} />
        <Route exact path="/Home/:id" element={<><Navbar user={user.accNo}/><Home user={user.uname}/></>} />
        <Route exact path="/Withdraw/:id" element={<><Navbar user={user.accNo}/><Withdraw user={user.uname} setAlarm={setAlarm}/></>} />
        <Route exact path="/Deposit/:id" element={<><Navbar user={user.accNo}/><Deposit user={user.uname} setAlarm={setAlarm}/></>} />
        <Route exact path="/CheckBalance/:id" element={<><Navbar user={user.accNo}/><Check_Balance user={user.uname} setAlarm={setAlarm}/></>} />
        <Route exact path="/Transfer/:id" element={<><Navbar user={user.accNo}/><Transfer user={user.uname} setAlarm={setAlarm}/></>} />
        <Route exact path="/Profile/:id" element={<><Navbar user={user.accNo}/><Profile user={user.uname} setAlarm={setAlarm}/></>} />
        <Route exact path="/NewAcc" element={<><Navbar user={user.accNo}/><Login setAlarm={setAlarm} storeUser={storeUser} /></>} />
      </Routes>
    </Router>
  );
}

export default App;

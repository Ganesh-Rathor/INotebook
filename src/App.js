import "./App.css";
import React,{useState} from 'react';
import { Routes, Route } from "react-router-dom";
import About from "./components/About/About/About";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";
import NoteState from "./components/context/NoteState";
import Alert from "./components/Alert/Alert"
import LogIn from "./components/Authenticate/logIn";
import SignUp from "./components/Authenticate/signUp";

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
      <NoteState>
        <Navbar />
      <Alert alert={alert} />

        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home alert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<LogIn alert={showAlert} />} />
            <Route exact path="/signup" element={<SignUp alert={showAlert} />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;

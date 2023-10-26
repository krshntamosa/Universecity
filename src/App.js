import React from "react";
import "./App.css";
import Login from "./Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;

import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { authMeFetch, isAuth } from "./store/auth.js";
import {
  HomePage,
  RegistrationPage,
  LoginPage,
  UsersPage,
} from "./pages/pages.js";
import React, { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const authPassed = useSelector(isAuth);
  useEffect(() => {
    dispatch(authMeFetch());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </>
  );
}

export default App;

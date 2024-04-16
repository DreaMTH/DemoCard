import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header.jsx";
import {
  HomePage,
  RegistrationPage,
  LoginPage,
  UsersPage,
} from "./pages/pages.js";
function App() {
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

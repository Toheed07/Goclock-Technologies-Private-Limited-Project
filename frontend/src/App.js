import { Routes, Route } from "react-router-dom";
import Login from "./components/login-in/login-in-form";
import RegistrationForm from "./components/register/registration-form";
import ManufactureHome from "./pages/Manufacture-Home/manufacture-home";
import TransporterHome from "./pages/Transporter-Home/transporter-home";

function App() {
  return (
    <>
       <Routes>
       <Route path="/" element={<Login />} />
        <Route path="register" element={<RegistrationForm />} />
        <Route path="manufacturer-home" element={<ManufactureHome />} />
        <Route path="transporter-home" element={<TransporterHome />} />
      </Routes>
    </>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/loginPage";
import VendorSignupPage from "./pages/signupPage/vendorSignupPage";

const App = () => {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/VendorSignup" element={<VendorSignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

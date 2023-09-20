import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import SignupPage from "./components/signup/SignupPage";
import LoginPage from "./components/login/LoginPage";
import TransferPage from "./components/transfer/TransferPage";

import AuthLayout from "./layouts/AuthLayout";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  
  return (
    <div class="mt-5 d-flex justify-content-center">
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route exact path="/" element={<LoginPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/transfer" element={<TransferPage />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

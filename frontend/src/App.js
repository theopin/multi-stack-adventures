import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForexTable from './components/forex/ForexDisplay';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import TransferForm from './components/transfer/TransferPage';
function App() {
  return (
    <div class="d-flex justify-content-center">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/home" element={<ForexTable />}></Route>
          <Route path="/transfer" element={<TransferForm />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;

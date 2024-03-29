import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../utils/axios";
import { HttpResponse } from "../../utils/httpResponse";

import { ToastContainer, toast } from 'react-toastify';

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/login");
  };


  const handleSignup = () => {
    postRequest('/accounts', {username, password, balance})
    .then((res) => {
      if (res.status === HttpResponse.CREATED && res.data.response) 
        navigate("/login");      
    })
    .catch((err) => {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    });
  };
  return (
    <div>
      <ToastContainer/>
      <h3>Sign Up</h3>
      <div>Please enter the following details.</div>
      <div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <small>Please enter a 6 digit numeric passcode.</small>
        </div>
        <div class="form-group">
          <label for="balance">Depositing Amount</label>
          <input
            type="number"
            class="form-control"
            placeholder="1"
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>

        <button
          disabled={!username || !password || !balance}
          class="btn btn-primary mt-2"
          onClick={handleSignup}
        >
          Create Account
        </button>
        <button
          class="btn btn-light mt-2"
          onClick={handleBack}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default SignupPage;

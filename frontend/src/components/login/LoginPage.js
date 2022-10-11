import jwt_decode from "jwt-decode";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../utils/axios";
import { HttpResponse } from "../../utils/httpResponse";
import { saveStorage } from "../../utils/storage";

import { ToastContainer, toast } from 'react-toastify';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = (e) => {
    postRequest('/accounts/auth', {username, password})
    .then((res) => {
      if (res.status === HttpResponse.OK && res.data.response) {
        document.cookie = `AccessToken=${res.data.response.token}`;
        const identity = jwt_decode(res.data.response.token)
        
        saveStorage("id", identity.id)
        navigate("/home");
      }
    })
    .catch((err) => {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    });
  }

  const redirectSignup = () => {
    navigate("/signup");
  }

  
    return (
      <div>
        <h3>Welcome to Delta Bank!</h3>
        <div>
        <ToastContainer />
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              required
              class="form-control"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <small>Please enter a 6 digit numeric passcode.</small>
          </div>
          <div class="d-flex justify-content-center">
          <button  class="col btn btn-primary" disabled={!username || !password} onClick={handleLogin}>
            Login
          </button>
          <button  class="col btn btn-success" onClick={redirectSignup}>
            Sign Up
          </button>
          </div>

        </div>
      </div>
    );
}



export default LoginPage;

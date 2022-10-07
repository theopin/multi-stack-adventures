import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../utils/axios";
import { HttpResponse } from "../../utils/httpResponse";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    postRequest('/accounts', {username, password, balance})
    .then((res) => {
      if (res.data.status === HttpResponse.CREATED && res.data.response) 
        navigate("/login");      
    })
    .catch((err) => {
      setError(err);
    });
  };
  return (
    <div>
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
          class="btn btn-primary"
          onClick={handleSignup}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default SignupPage;

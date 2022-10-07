
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../utils/axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    postRequest('acccounts/auth', {username, password})
    .then((res) => {
      console.log(res)
    })
  }


  
    return (
      <div>
        <h3>Welcome to Delta Bank!</h3>
        <form>
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
          <button type="submit" class="btn btn-primary" disabled={!username || !password} onClick={handleLogin}>
            Submit
          </button>
        </form>
      </div>
    );
}



export default LoginPage;

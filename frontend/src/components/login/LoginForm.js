const LoginForm = () => {
  return (
    <div class="w-50">
      <h3>Welcome to Delta Bank!</h3>
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="text"
            aria-describedby="emailHelp"
            placeholder="Enter username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
          />
          <small>Please enter a 6 digit numeric passcode.</small>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

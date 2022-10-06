const SignupForm = () => {
  return (
    <div class="w-50">
      <h3>Sign Up</h3>
      <div>Please enter the following details.</div>
      <form>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
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
        <div class="form-group">
          <label for="balance">Depositing Amount</label>
          <input
            type="number"
            class="form-control"
            id="balance"
            placeholder="Password"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

const TransferForm = () => {
  return (
    <div class="w-50">
      <h3>Welcome to Delta Bank!</h3>
      <form>
        <div class="form-group">
          <label for="username">User Account</label>
          <input
            type="text"
            class="form-control"
            id="text"
            aria-describedby="emailHelp"
            placeholder="Enter username"
          />
        </div>
        <div class="form-group">
          <label for="balance">Transfer Amount</label>
          <input
            type="number"
            class="form-control"
            id="balance"
            placeholder="Value"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TransferForm;

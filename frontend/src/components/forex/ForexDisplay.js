const ForexTable = () => {
  return (
    <div class="w-50">
      <h3>Forex Converter</h3> 
       {/*TODO: Fetch and run data  */}
       <div>Currency Selected: SGD</div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Currency</th>
            <th scope="col">Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>INR</td>
            <td>56.1</td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col">
          {/* TODO: Fetch data  */}
          <p>Last Updated at: 6 October 2022 11:59pm</p>
        </div>
        <div class="col">
          {/* TODO: Fetch data  */}
          <button class="btn btn-primary">Refresh Data</button>
        </div>
      </div>
    </div>
  );
};

export default ForexTable;

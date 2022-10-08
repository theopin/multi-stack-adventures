import  { useState, useEffect } from "react";
import { patchRequest } from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { HttpResponse } from "../../utils/httpResponse";

function ForexTable() {
  const [account, setAccount] = useState();

  useEffect(() => {
    patchRequest('/accounts/' + getStorage("id")).then((res) => {
      if (res.status === HttpResponse.OK) {
        setAccount(res.data.response[0]);
      }
    });
  }, []);

  return (
    <div>
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
          {/* TODO: Fetch data  */}
          <p>Last Updated at: 6 October 2022 11:59pm</p>
          {/* TODO: Fetch data  */}
          <button class="btn btn-primary">Refresh Data</button>
      </div>
    </div>
  );
};

export default ForexTable;

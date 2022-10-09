import { useState, useEffect } from "react";
import { HttpResponse } from "../../utils/httpResponse";
import { getLambdaRequest } from "../../utils/axiosLambda";

function ForexTable() {
  const [ratesData, setRates] = useState();

  useEffect(() => {
    getLambdaRequest("/").then((res) => {
      if (res.status === HttpResponse.OK) {
        setRates(res.data);
      }
    });
  }, []);

  if (!ratesData) return <div></div>;

  const DisplayData = () => {
    return Object.keys(ratesData.rates).map((key) => {
      return (
        <tr key={key}>
          <td >{key}</td>
          <td>{ratesData.rates[key]}</td>
        </tr>
      );
    });
  };

  
  return (
    <div>
      <h3>Forex Converter</h3>
      <div>Currency Selected: SGD</div>
      <table class="table overflow-hidden" >
        <thead>
          <tr>
            <th scope="col">Currency</th>
            <th scope="col">Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          <DisplayData />
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
}

export default ForexTable;

import { useState, useEffect } from "react";
import { HttpResponse } from "../../utils/httpResponse";
import { getLambdaRequest } from "../../utils/axiosLambda";
import { ToastContainer, toast} from "react-toastify";

function ForexTable() {
  const [ratesData, setRates] = useState();

  useEffect(() => {
    getLambdaRequest("/").then((res) => {
      if (res.status === HttpResponse.OK) {
        setRates(res.data);
      }
    })
    .catch((err) => {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      })
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
      <h3>Asian Forex Converter</h3>
      <ToastContainer/>
      <div>SGD to other Currencies</div>
      <div style={{'max-height': '600px', display: 'block', overflow: 'auto'}}>
      <table class="table"  >
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
      </div>


    </div>
  );
}

export default ForexTable;

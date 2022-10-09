import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getRequest, patchRequest } from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { HttpResponse } from "../../utils/httpResponse";
import { ToastContainer, toast } from "react-toastify";

function TransferPage() {
  const [account, setAccount] = useState();
  const [id, setId] = useState("");
  const [change, setChange] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getRequest("/accounts/" + getStorage("id"))
    .then((res) => {
      if (res.status === HttpResponse.OK) {
        setAccount(res.data.response[0]);
      }
    })
    .catch((err) => {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      })
    })
  });

  const handleTransfer = (e) => {
    patchRequest("/accounts/" + id, { change })
      .then((res) => {
        if (res.status === HttpResponse.OK && res.data.response) {
          patchRequest("/accounts/" + getStorage("id"), {
            change: parseInt(change) * -1,
          })
            .then((res) => {
              if (res.status === HttpResponse.OK && res.data.response)
                navigate("/home");
            })
            .catch((err) => {
              toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
              })
            })
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
  };
  if (!account) return <div></div>;
  return (
    <div>
      <ToastContainer/>
      <h3>Transfer Money</h3>
      <div class="row">
        <div class="col">
          <h4>Account Balance</h4>
          <h1>S${account.balance}</h1>
        </div>
        <div class="col">
          <div class="form-group ">
            <label for="username">User Account</label>
            <input
              type="text"
              class="form-control"
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div class="form-group">
            <label for="balance">Transfer Amount</label>
            <input
              type="number"
              class="form-control"
              onChange={(e) => setChange(e.target.value)}
              placeholder="Value"
            />
          </div>
          <button class="btn btn-primary" onClick={handleTransfer}>
            Transfer Money
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransferPage;

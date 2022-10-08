import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { patchRequest } from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { HttpResponse } from "../../utils/httpResponse";

function TransferPage() {

  const [id, setId] = useState("");
  const [change, setChange] = useState("");
  const navigate = useNavigate();

  const handleTransfer = (e) => {
    patchRequest('/accounts/' + id, {change})
    .then((res) => {
      if (res.status === HttpResponse.OK && res.data.response) {
        patchRequest('/accounts/' + getStorage("id"), {change: parseInt(change) * -1 })
        .then((res) => {
          if (res.status === HttpResponse.OK && res.data.response) 
            navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  }

  return (
    <div>
      <h3>Transfer Money</h3>
      <div>
        <div class="form-group">
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
  );
};

export default TransferPage;

import  { useState, useEffect } from "react";
import { getRequest } from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { HttpResponse } from "../../utils/httpResponse";


const AccountDetails = () => {
  const [account, setAccount] = useState();

  useEffect(() => {
    getRequest('/accounts/' + getStorage("id")).then((res) => {
      if (res.status === HttpResponse.OK) {
        setAccount(res.data.response[0]);
      }
    });
  }, []);
    if (!account)
      return (<div></div>)
    return (
      <div>
        <h4>Account Balance</h4>
        <h1>
          S${account.balance}
        </h1>
        
      </div>
    );
}

export default AccountDetails;
import  { useState, useEffect } from "react";
import { getRequest } from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { HttpResponse } from "../../utils/httpResponse";
import { ToastContainer, toast } from "react-toastify";


const AccountDetails = () => {
  const [account, setAccount] = useState();

  useEffect(() => {
    getRequest('/accounts/' + getStorage("id"))
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
  }, []);
    if (!account)
      return (<div></div>)
    return (

      <div>
        <ToastContainer/>
        <h4>Account Balance</h4>
        <h1>
          S${account.balance}
        </h1>
        
      </div>
    );
}

export default AccountDetails;
import  { useState, useEffect } from "react";
import { getRequest } from "../../utils/axios";
import { getStorage } from "../../utils/storage";

import Navbar from "./Navbar.js";
import AccountDetails from './AccountDetails.js'
import ForexTable  from "./ForexDisplay.js";
import { HttpResponse } from "../../utils/httpResponse";


function HomePage() {
  const [account, setAccount] = useState();

  useEffect(() => {
    getRequest('/accounts/' + getStorage("id")).then((res) => {
      if (res.status === HttpResponse.OK) {
        setAccount(res.data.response[0]);
      }
    });
  }, []);
  
        return (
          <div>
            <Navbar />
            <div class="row">
                <div class="col">
                  <AccountDetails account={account}/>
                </div>
                <div class="col">
                    <ForexTable  />
                </div>
            </div>
          </div>
        );
    }
    
    
    
    export default HomePage;
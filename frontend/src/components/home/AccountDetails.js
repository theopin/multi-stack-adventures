import { getRequest } from "../../utils/axios";
import { getStorage } from "../../utils/storage";


function HomePage() {

  const retrieveBalance = () => {
    const result = getRequest('/accounts/' + getStorage("id"))
    return result.data.response[0].balance
}
    return (
      <div>
        <h4>Account Balance</h4>
        <h1>
          {retrieveBalance}
        </h1>
        
      </div>
    );
}

export default HomePage;
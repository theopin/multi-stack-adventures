import { getRequest } from "../../utils/axios";

function retrieveBalance() {
  console.log(111)
    getRequest('/accounts/111')
    .then((res) => {
      console.log(res)
    })

}
function HomePage() {

    return (
      <div>
        <h4>Account Balance</h4>
        <h1>S${retrieveBalance}</h1>
        
      </div>
    );
}

export default HomePage;
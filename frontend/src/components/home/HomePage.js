
import Navbar from "./Navbar.js";
import AccountDetails from './AccountDetails.js'
import ForexTable  from "./ForexDisplay.js";


function HomePage() {

  
        return (
          <div>
            <Navbar />
            <div class="row">
                <div class="col">
                  <AccountDetails/>
                </div>
                <div class="col">
                    <ForexTable  />
                </div>
            </div>
          </div>
        );
    }
    
    
    
    export default HomePage;
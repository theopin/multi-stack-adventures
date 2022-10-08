import { clearCookies } from "../../utils/cookies";
import { clearStorage } from "../../utils/storage";
import { deleteRequest } from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { HttpResponse } from "../../utils/httpResponse";
import { useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();

  const handleNavigateTransfer = () => {
    navigate("/transfer")
  }

  const handleDelete = () => {
    deleteRequest('/accounts/' + getStorage("id")).then((res) => {
      if (res.status === HttpResponse.OK) {
        clearCookies()
        clearStorage("id")
        window.location.reload(false);
      }
    });

  };
  const handleLogout = () => {
    document.cookie = "";
    clearCookies()
    clearStorage("id")
    window.location.reload(false);
  };

  return (
    <div>
      <button class="col btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
      <button class="col btn btn-success" onClick={handleNavigateTransfer}>
        Transfer Funds
      </button>
      <button class="col btn btn-danger" onClick={handleDelete}>
        Delete Account
      </button>
    </div>
  );
}

export default Navbar;

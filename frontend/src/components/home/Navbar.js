import { clearCookies } from "../../utils/cookies";
import { clearStorage } from "../../utils/storage";
import { deleteRequest } from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { HttpResponse } from "../../utils/httpResponse";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast  } from "react-toastify";


function Navbar() {
  const navigate = useNavigate();

  const handleNavigateTransfer = () => {
    navigate("/transfer")
  }

  const handleDelete = () => {
    deleteRequest('/accounts/' + getStorage("id"))
    .then((res) => {
      if (res.status === HttpResponse.OK) {
        clearCookies()
        clearStorage("id")
        window.location.reload(false);
      }
    })
    .catch((err) => {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      })
    })

  };
  const handleLogout = () => {
    document.cookie = "";
    clearCookies()
    clearStorage("id")
    window.location.reload(false);
  };

  return (
    <div>
      <ToastContainer/>
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

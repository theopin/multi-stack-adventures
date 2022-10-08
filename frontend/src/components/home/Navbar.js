import { clearCookies } from "../../utils/cookies";
import { clearStorage } from "../../utils/storage";

function Navbar() {

  const handleDelete = () => {
    console.log("Deleted");
    clearCookies()
    clearStorage("id")
    window.location.reload(false);
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
      <button class="col btn btn-danger" onClick={handleDelete}>
        Delete Account
      </button>
    </div>
  );
}

export default Navbar;

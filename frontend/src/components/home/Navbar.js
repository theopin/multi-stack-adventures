import { clearCookies } from "../../utils/cookies";

function Navbar() {

  const handleDelete = () => {
    console.log("Deleted");
    clearCookies()
    window.location.reload(false);
  };
  const handleLogout = () => {
    document.cookie = "";
    clearCookies()
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

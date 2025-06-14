import { useContext } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import { signOut } from "../utils/queries";
import { AuthContext } from "./AuthContext";

function SideBar() {
  const { logout } = useContext(AuthContext); // to use logout function in this component
  const navigate = useNavigate();

  const signOutUser = async () => {
    await signOut(); // log out from supabase
    logout(); // updating context for the app
    navigate('/');
  };

  return (
    <div className="flex gap-x-4 text-sm">
      <div className="border-teal-800 border-r-4 pr-2">
        <div>
          <NavLink to="/">Input</NavLink>
        </div>
        <div>
          <NavLink to="history">View</NavLink>
        </div>
        <div>
          <NavLink to="visualize">Visualize (beta)</NavLink>
        </div>
        <div>
          <button type="button" onClick={signOutUser}>
            Sign out
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default SideBar;

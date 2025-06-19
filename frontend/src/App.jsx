import { useEffect, useContext } from "react";
import "./assets/styles.css";
import { Routes, Route } from "react-router";
import SpendingList from "./components/SpendingList";
import AddSpending from "./components/AddSpending";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SideBar from "./components/SideBar";
import Chart from './components/Chart';
import { supabase } from "./utils/queries";
import { AuthContext } from "./components/AuthContext";

function App() {
  const { isAuthenticated, user, login, logout } = useContext(AuthContext);
  
  useEffect(() => {
    const getCurrSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session == null) {
        console.log(`log in status: ${isAuthenticated}`);
        logout();
      } else {
        console.log(`log in status: ${isAuthenticated}`);
        console.log(data.session.user);
        login(data.session.user);
      }
    };
    getCurrSession();
  }, []);

  return isAuthenticated ? (
      <Routes>
        <Route path="/" element={<SideBar />}>
          {/* list of all purchase */}
          <Route path="history" element={<SpendingList />} /> 
          <Route
            index // <-- "/"
            element={<AddSpending />}
          />
          <Route path="visualize" element={<Chart />} />
        </Route>
      </Routes>
  ) : (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
      </Routes>
  );
}

export default App;
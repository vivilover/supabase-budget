// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
import "./assets/styles.css";
import { Outlet, Routes, Route, NavLink } from "react-router";
import SpendingList from "./components/SpendingList";
import AddSpending from "./components/AddSpending";

// const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

function SideBar() {
  return (
    <div className="flex gap-x-4">
      <div className="">
        <div><NavLink to="add">Input</NavLink></div>
        <div><NavLink to="history">View</NavLink></div>
        <div><NavLink to="visualize">Visualize (beta)</NavLink></div>
      </div>
      <Outlet />
    </div>
  );
}

function App() {
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   getList();
  // }, []);

  // async function getList() {
  //   const { data } = await supabase.from("spending").select();
  //   setList(data);
  // }

  return (
    <Routes>
      <Route path="/" element={<SideBar />}>
        <Route path="history" element={<SpendingList />} />
        <Route
          index // <-- "/"
          element={<AddSpending />}
        />
      </Route>
      {/* <div class="font-bold underline">setup</div>
      <ul>
        {list.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul> */}
    </Routes>
  );
}

export default App;

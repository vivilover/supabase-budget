import { useEffect, useState, useContext } from "react";
import { getList } from "../utils/queries.js";
import { AuthContext } from "./AuthContext.jsx";

function SpendingList() {
  const [list, setList] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user.id;
  const userName = user.email.split('@')[0];

  // search button (filter by spending.name)
  // view by category 
  // view by month (2025 May, 2025 Jun, etc)
  useEffect(() => {
    (async () => {
      const spendings = await getList(userId);
      setList(spendings);
    })();
  }, []);

  return (
    <div className="w-full">
      <div className="font-bold underline">List for {userName}</div>
      <div className="flex flex-col">
        {list.map((l) => (
          <div
            className="flex justify-start gap-x-2 border-b-2 border-gray-400 hover:bg-gray-200"
            key={l.id}
          >
            <div className="border-1 border-red-500 grow-1 basis-0">
              {l.date}
            </div>
            <div className="border-1 border-red-500 grow-1 basis-0">
              {l.name}
            </div>
            <div className="border-1 border-red-500 grow-1 basis-0">
              {l.amount}
            </div>
            <div className="border-1 border-red-500 grow-1 basis-0">
              {l.category}
            </div>
            <div className="border-1 border-red-500 grow-1 basis-0">
              {l.description}
            </div>
            <button
              type="button"
              className="border-1 border-red-500 grow-0 basis-0 rounded-lg bg-yellow-400 py-[1px] px-2"
            >
              Edit
            </button>
            <button
              type="button"
              className="border-1 border-red-500 grow-0 basis-0 rounded-lg border-2 border-emerald-500 bg-red-400 py-[1px] px-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpendingList;

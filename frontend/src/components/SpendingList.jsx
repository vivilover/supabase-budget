import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

function SpendingList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    const { data } = await supabase.from("spending").select();
    setList(data);
  }

  return (
    <div>
      <div className="font-bold underline">setup</div>
      <ul>
        {list.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SpendingList;
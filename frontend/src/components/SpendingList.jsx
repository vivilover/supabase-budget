import { useEffect, useState } from "react";
import { getList } from '../utils/queries.js';

function SpendingList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getList();
      setList(data);
    })()
  }, []);

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
import { getListByCategory } from '../utils/queries';
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

function DisplayList({ mode }) {

  const { user } = useContext(AuthContext);
  const userId = user.id;

  useEffect(() => {
    (async () => {
      const list = await getListByCategory(userId, mode);
      console.log(list);
    })();
  }, [mode]);

  return (
    <div>
      {mode == "category" ? (
        <div>category</div>
      ) : mode == "date" ? (
        <div>date</div>
      ) : (
        <div>filter mode not chosen</div>
      )}
    </div>
  );
}

export default DisplayList;

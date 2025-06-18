import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getCategory } from "../utils/queries.js";

function CurrCategory({ categories, setCategories }) {
  const { user } = useContext(AuthContext);
  const userId = user.id;

  // useEffect(() => {
  //   (async () => {
  //     const userCategories = await getCategory(userId);
  //     setCategories(userCategories);
  //   })();
  // }, [categories]);

  return (
    <div className="flex flex-col">
      {categories && categories.map((c) => (
        <div
          className="flex justify-start gap-x-2 border-b-2 border-gray-400 hover:bg-gray-200"
          key={c.id}
        >
          <div className="border-1 border-red-500 grow-1 basis-0">{c.name}</div>
        </div>
      ))}
    </div>
  );
}

export default CurrCategory;

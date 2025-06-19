import { useContext, useState, useEffect } from "react";
import { insertSpending, getCategory } from "../utils/queries.js";
import { AuthContext } from "./AuthContext.jsx";
import CurrCategory from "./CurrCategory.jsx";
import AddCategory from "./AddCategory.jsx";

// React Hook Form dependencies
import { useForm } from "react-hook-form";

function AddSpending() {
  // use state here to update categories
  const [categories, setCategories] = useState([]);
  const numCategory = categories.length;

  const { user } = useContext(AuthContext);
  // To synchronize user category upon User Adding the category
  useEffect(() => {
    (async () => {
      const userCategories = await getCategory(user.id);
      setCategories(userCategories);
      console.log(userCategories);
    })();
  }, []); // When categories change, trigger useEffect again

  const [showCurrCategory, setShowCurrCategory] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const toggleVisibilityCurrCategory = () => {
    setShowCurrCategory(!showCurrCategory);
  };
  const toggleVisibilityAddCategory = () => {
    setShowAddCategory(!showAddCategory);
  };

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const { date, name, amount, category, description } = data;
    const result = await insertSpending(
      name,
      date,
      category,
      description,
      amount,
      user.id
    );
    // reset all field values
    resetField("date");
    resetField("name");
    resetField("category");
    resetField("amount");
    resetField("description");
  };

  return (
    <div>
      <form
        action=""
        className="add-form flex gap-x-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="date">Date</label>
        <input type="date" {...register("date")} />
        <label htmlFor="name">Name</label>
        <input type="text" {...register("name", { required: true })} />
        <label htmlFor="amount">Amount</label>
        <input type="number" step="0.01" {...register("amount")} />
        <label htmlFor="category">Category</label>
        {/* <input type="text" {...register("category")} /> */}
        <select {...register("category")} className="border-gray-500 border-2">
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="description">Description</label>
        <input type="text" {...register("description")} />
        <button
          type="submit"
          name="submit"
          value="submit"
          className="rounded-lg border-2 border-emerald-500 bg-emerald-200 py-[1px] px-2"
        >
          Add
        </button>
      </form>
      <div className="text-red-400 text-sm">
        *Spending category can be added below
      </div>
      {/* <div
        className="font-medium text-gray-400"
        onClick={toggleVisibilityCurrCategory}
      >
        Show existing categories
      </div>
      {showCurrCategory && (
        <CurrCategory categories={categories} setCategories={setCategories} />
      )} */}
      <div
        className="font-medium text-gray-400"
        onClick={toggleVisibilityAddCategory}
      >
        Add category
      </div>
      {showAddCategory && <AddCategory setCategories={setCategories} />}
    </div>
  );
}

export default AddSpending;

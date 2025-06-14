import { useContext, useState } from "react";
import { insertSpending } from "../utils/queries.js";
import { AuthContext } from "./AuthContext.jsx";
import CurrCategory from './CurrCategory.jsx';
import AddCategory from './AddCategory.jsx';

// React Hook Form dependencies
import { useForm } from "react-hook-form";

function AddSpending() {
  const { user } = useContext(AuthContext);
  const [showCurrCategory, setShowCurrCategory] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const toggleVisibilityCurrCategory = () => {
    setShowCurrCategory(!showCurrCategory);
  } 
  const toggleVisibilityAddCategory = () => {
    setShowAddCategory(!showAddCategory);
  } 

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
        className="add-form gap-x-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="date">Date</label>
        <input type="date" {...register("date")} />
        <label htmlFor="name">Name</label>
        <input type="text" {...register("name", { required: true })} />
        <label htmlFor="amount">Amount</label>
        <input type="number" step="0.01" {...register("amount")} />
        <label htmlFor="category">Category</label>
        <input type="text" {...register("category")} />
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
      <div className="font-medium text-gray-400" onClick={toggleVisibilityCurrCategory}>Show existing categories</div>
      { showCurrCategory &&  <CurrCategory /> }
      <div className="font-medium text-gray-400" onClick={toggleVisibilityAddCategory}>Add category</div>
      { showAddCategory &&  <AddCategory /> }
    </div>
  );
}

export default AddSpending;

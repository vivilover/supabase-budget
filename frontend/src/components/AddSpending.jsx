import { useState, useEffect } from "react";
import { insertSpending } from "../utils/queries.js";

function AddSpending() {
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    amount: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // const [date, setDate] = useState("");
  // const [name, setName] = useState("");
  // const [amount, setAmount] = useState(0.0);
  // const [category, setCategory] = useState("");
  // const [description, setDescription] = useState("");

  const addInput = async (e) => {
    e.preventDefault();
    console.log(formData.name);
    console.log(formData.amount);
    const { date, name, amount, category, description } = formData;
    const result = await insertSpending(
      name,
      date,
      category,
      description,
      amount
    );
    console.log(result);
    setFormData({
      date: "",
      name: "",
      amount: "",
      category: "",
      description: "",
    });
  };

  return (
    <form action="" className="add-form gap-x-2" onSubmit={addInput}>
      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        step="0.01"
        id="amount"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
      />
      <label htmlFor="category">Category</label>
      <input
        type="text"
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <button
        type="submit"
        name="submit"
        value="submit"
        className="rounded-lg border-2 border-emerald-500 bg-emerald-200 py-[1px] px-2"
      >
        Add
      </button>
    </form>
  );
}

export default AddSpending;

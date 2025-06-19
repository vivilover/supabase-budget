import { useState } from "react";
import { Outlet, NavLink } from "react-router";
import DisplayList from './DisplayList';

function ViewOption() {
  const [viewOption, setViewOption] = useState("category");

  const handleChange = (e) => {
    setViewOption(e.target.value);
    console.log(e.target.value);
  }
  // depending on view option, display list

  return (
    <div>
      <div>
        <label htmlFor="filter-option">Filter by:</label>
        <select id="filter-option" value={viewOption} onChange={handleChange} className="border-gray-500 border-2">
          <option value="">--Please choose an option--</option>
          <option value="category">Category</option>
          <option value="date">Date</option>
        </select>
      </div>
      <DisplayList mode={viewOption} />
    </div>
  )
}

export default ViewOption;
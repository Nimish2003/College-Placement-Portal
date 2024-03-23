import React, { useState } from "react";

function MyComponent2() {
  const [branch, setBranch] = useState("");

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  return (
    <div className="col-span-2 grid">
      <div className="w-full">
        <label
          htmlFor="branch"
          className="block text-sm font-medium leading-none"
        >
          Branch of Engineering
        </label>
        <select
          id="branch"
          className="flex h-10 mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-black/30 focus:border-black/30"
          value={branch}
          onChange={handleBranchChange}
        >
          <option value="">Select Branch</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Electronics and Telecommunications Engineering">
            Electronics and Telecommunications Engineering
          </option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Artificial Intelligence and Data Science Engineering">
            Artificial Intelligence and Data Science Engineering
          </option>
          {/* Add more options as needed */}
        </select>
      </div>
      {/* Add other input fields */}
    </div>
  );
}

export default MyComponent2;

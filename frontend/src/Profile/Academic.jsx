import React, { useState } from "react";
import MyComponent from "./MyCompenent";
import MyComponent1 from "./MyComponent1";
import MyComponent2 from "./MyComponent2";
import Sidebar from "./SideBar";

export default function Academic() {
  const [educationType, setEducationType] = useState("");

  const handleEducationTypeChange = (e) => {
    setEducationType(e.target.value);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 mx-auto w-full max-w-7xl bg-slate-100 py-2">
        <div className="mx-auto my-4 max-w-2xl md:my-6">
          {/* Form */}
          <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
            <p className="text-sm font-bold text-gray-900">Academic Details</p>
            <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
              <div className="col-span-2 grid">
                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="board10thMarks"
                  >
                    10th Standard Marks
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter 10th Standard Marks"
                    id="board10thMarks"
                  ></input>
                </div>
              </div>

              <div className="col-span-2 grid">
                {/* Dropdown to select education type */}
                <div className="w-full mb-4">
                  <label
                    htmlFor="educationType"
                    className="block text-sm font-medium leading-none"
                  >
                    12th/Diploma
                  </label>
                  <select
                    id="educationType"
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    value={educationType}
                    onChange={handleEducationTypeChange}
                  >
                    <option value="">Select Education Type</option>
                    <option value="diploma">Diploma</option>
                    <option value="board">Board</option>
                  </select>
                </div>

                {/* Additional input fields based on selected education type */}
                {educationType === "diploma" && (
                  <div className="w-full mb-4">
                    {/* Input fields for diploma */}
                    {/* Add your input fields for diploma details here */}
                    <label
                      htmlFor="diplomaMarks"
                      className="block text-sm font-medium leading-none"
                    >
                      Diploma Marks
                    </label>
                    <input
                      type="text"
                      id="diplomaMarks"
                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter Diploma Marks"
                    />
                    {/* Add more input fields for diploma details here */}
                  </div>
                )}

                {educationType === "board" && (
                  <div className="w-full mb-4">
                    <label
                      htmlFor="board12thMarks"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                      12th Standard Marks
                    </label>
                    <input
                      type="text"
                      id="board12thMarks"
                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter 12th Standard Marks"
                    />
                    {/* Add more input fields for board details here */}
                  </div>
                )}
              </div>

              <div>
                <MyComponent2 />
              </div>

              <div className="col-span-2 grid">
                <MyComponent1 />
              </div>

              <div className="col-span-2 grid">
                <p className="text-sm font-bold text-gray-900 mb-4">Backlogs</p>
                <MyComponent />
              </div>

              <div className="col-span-2 grid">
                <button
                  type="button"
                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


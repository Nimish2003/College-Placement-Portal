import React, { useState } from "react";

export default function Academic() {
  const [educationType, setEducationType] = useState("");

  const handleEducationTypeChange = (e) => {
    setEducationType(e.target.value);
  };

  return (
    <div className="mx-auto w-full max-w-7xl bg-slate-100 py-2">
      <div className="mx-auto my-4 max-w-2xl md:my-6">
        {/* Form */}
        <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
          <p className="text-sm font-bold text-gray-900">Academic Details</p>
          <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            <div className="col-span-2 grid">
              {/* Dropdown to select education type */}
              <div className="w-full mb-4">
                <label
                  htmlFor="educationType"
                  className="block text-sm font-medium leading-none"
                >
                  Select Previous Education Type
                </label>
                <select
                  id="educationType"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-black/30 focus:border-black/30"
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
                  {/* Input fields for board */}
                  {/* Add your input fields for board details here */}
                  <label
                    htmlFor="board10thMarks"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    10th Standard Marks
                  </label>
                  <input
                    type="text"
                    id="board10thMarks"
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter 10th Standard Marks"
                  />
                  {/* Add more input fields for board details here */}
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

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="year"
              >
                Year of Study
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter year of study"
                id="year"
              ></input>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="Semester"
              >
                Semester
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your semester"
                id="semester"
              ></input>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="Branch"
                >
                  Branch of Engineering
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your branch"
                  id="branch"
                ></input>
              </div>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="firstse"
              >
                Year of Study
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter "
                id="firstYearPercentage1"
              ></input>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="Semester"
              >
                Semester
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your semester"
                id="semester"
              ></input>
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
  );
}

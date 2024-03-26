import React, { useState } from "react";
import "../Profile/Form.css";

function MyComponent1({
  yearOfStudy,
  handleYearOfStudyChange,
  handleSemesterChange,
  semesters,
}) {
  const renderInputFields = () => {
    switch (yearOfStudy) {
      // case "1st year":
      //   return (
      //     <>
      //     </>
      //   );
      // case "2nd year":
      //   return (
      //     <>
      //     <div className="w-full mb-4">
      //     <label htmlFor="1stSemGPA" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      //       1st Semester GPA
      //     </label>
      //     <input
      //       type="text"
      //       id="1stSemGPA"
      //       name="1stSemGPA"
      //       className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      //       placeholder="Enter 1st Semester GPA"
      //     />
      //     <label htmlFor="1stSemPercentage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      //       Percentage
      //     </label>
      //     <input
      //       type="text"
      //       id="1stSemPercentage"
      //       className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      //       placeholder="Enter Percentage"
      //     />
      //   </div>
      //   <div className="w-full mb-4">
      //     <label htmlFor="2ndSemGPA" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      //       2nd Semester GPA
      //     </label>
      //     <input
      //       type="text"
      //       id="2ndSemGPA"
      //       name="2ndSemGPA"
      //       className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      //       placeholder="Enter 2nd Semester GPA"
      //     />
      //     <label htmlFor="2ndSemPercentage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      //       Percentage
      //     </label>
      //     <input
      //       type="text"
      //       id="2ndSemPercentage"
      //       name=""
      //       className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      //       placeholder="Enter Percentage"
      //     />
      //   </div>
      //       {/* Input fields for 2nd year */}
      //       {/* Similar to above, add input fields for 3rd and 4th semesters */}
      //     </>
      //   );
      case "TE passed":
        return (
          <>
            <div className="w-full mb-4">
              <label
                htmlFor="1stSemGPA"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                1st Semester GPA
              </label>
              <input
                type="text"
                id="1stSemGPA"
                name="1stSemGPA"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter 1st Semester GPA"
              />
              <label
                htmlFor="1stSemPercentage"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Percentage
              </label>
              <input
                type="text"
                id="1stSemPercentage"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter Percentage"
              />
            </div>
            <div className="w-full mb-4">
              <label
                htmlFor="2ndSemGPA"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                2nd Semester GPA
              </label>
              <input
                type="text"
                id="2ndSemGPA"
                name="2ndSemGPA"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter 2nd Semester GPA"
              />
              <label
                htmlFor="2ndSemPercentage"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Percentage
              </label>
              <input
                type="text"
                id="2ndSemPercentage"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter Percentage"
              />
            </div>

            <div className="w-full mb-4">
              <label
                htmlFor="3rdSemGPA"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                3rd Semester GPA
              </label>
              <input
                type="text"
                id="3rdSemGPA"
                name="3rdSemGPA"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter 3rd Semester GPA"
              />
              <label
                htmlFor="3rdSemPercentage"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Percentage
              </label>
              <input
                type="text"
                id="3rdSemPercentage"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter Percentage"
              />
            </div>
            <div className="w-full mb-4">
              <label
                htmlFor="4thSemGPA"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                4th Semester GPA
              </label>
              <input
                type="text"
                id="4thSemGPA"
                name="4thSemGPA"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter 4th Semester GPA"
              />
              <label
                htmlFor="4thSemPercentage"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Percentage
              </label>
              <input
                type="text"
                id="4thSemPercentage"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter Percentage"
              />
            </div>
            <div className="w-full mb-4">
              <label
                htmlFor="4thSemGPA"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                5th Semester GPA
              </label>
              <input
                type="text"
                id="5thSemGPA"
                name="5thSemGPA"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter 4th Semester GPA"
              />
              <label
                htmlFor="4thSemPercentage"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Percentage
              </label>
              <input
                type="text"
                id="4thSemPercentage"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter Percentage"
              />
            </div>
            <div className="w-full mb-4">
              <label
                htmlFor="4thSemGPA"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                6th Semester GPA
              </label>
              <input
                type="text"
                id="6thSemGPA"
                name="6thSemGPA"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter 4th Semester GPA"
              />
              <label
                htmlFor="4thSemPercentage"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Percentage
              </label>
              <input
                type="text"
                id="7thSemPercentage"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter Percentage"
              />
            </div>
            {/* Input fields for 3rd year */}
            {/* Similar to above, add input fields for 5th and 6th semesters */}
          </>
        );
      case "BE":
        return (
          <>
            {/* <div className="w-full mb-4">
          <label htmlFor="1stSemGPA" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            1st Semester GPA
          </label>
          <input
            type="text"
            id="1stSemGPA"
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter 1st Semester GPA"
          />
          <label htmlFor="1stSemPercentage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Percentage
          </label>
          <input
            type="text"
            id="1stSemPercentage"
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter Percentage"
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="2ndSemGPA" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            2nd Semester GPA
          </label>
          <input
            type="text"
            id="2ndSemGPA"
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter 2nd Semester GPA"
          />
          <label htmlFor="2ndSemPercentage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Percentage
          </label>
          <input
            type="text"
            id="2ndSemPercentage"
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter Percentage"
          />
        </div>

        <div className="w-full mb-4">
          <label htmlFor="3rdSemGPA" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            3rd Semester GPA
          </label>
          <input
            type="text"
            id="3rdSemGPA"
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter 3rd Semester GPA"
          />
          <label htmlFor="3rdSemPercentage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Percentage
          </label>
          <input
            type="text"
            id="3rdSemPercentage"
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter Percentage"
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="4thSemGPA" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            4th Semester GPA
          </label>
          <input
            type="text"
            id="4thSemGPA"
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter 4th Semester GPA"
          />
          <label htmlFor="4thSemPercentage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Percentage
          </label>
          <input
            type="text"
            id="4thSemPercentage"
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter Percentage"
          />
        </div>

        <div className="w-full mb-4">
          <label htmlFor="5thSemGPA" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            5th Semester GPA
          </label>
          <input
            type="text"
            id="5thSemGPA"
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter 5th Semester GPA"
          />
          <label htmlFor="5thSemPercentage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Percentage
          </label>
          <input
            type="text"
            id="5thPercentage"
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter Percentage"
          />
        </div> */}
            <div className="w-full mb-4">
              <label
                htmlFor="6thSemGPA"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                7th Semester GPA
              </label>
              <input
                type="text"
                id="7thSemGPA"
                name="7thSemGPA"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter 6th Semester GPA"
              />
              <label
                htmlFor="7thSemPercentage"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Percentage
              </label>
              <input
                type="text"
                id="6thSemPercentage"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter Percentage"
              />
            </div>

            {/* Input fields for 4th year */}
            {/* Similar to above, add input fields for 7th and 8th semesters */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="col-span-2 grid">
      <div className="w-full mb-4">
        <label
          htmlFor="year"
          className="block text-sm font-medium leading-none"
        >
          Year of Study
        </label>
        <select
          id="year"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-black/30 focus:border-black/30"
          value={yearOfStudy}
          onChange={handleYearOfStudyChange}
        >
          <option value="">Select Year of Study</option>
          <option value="1st year">TE passed</option>
          <option value="2nd year">BE</option>
          {/* <option value="3rd year">3rd year</option>
          <option value="4th year">4th year</option> */}
        </select>
      </div>
      <div>
        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-4">
          {" "}
          Enter your semester GPA
        </p>
      </div>

      {renderInputFields()}
    </div>
  );
}

export default MyComponent1;

import React, { useState } from "react";
// import MyComponent from "./MyComponent.jsx";
// import MyComponent1 from "./MyComponent1.jsx";
// import MyComponent2 from "./MyComponent2.jsx";
import Sidebar from "./SideBar";
import "../Profile/Form.css";

export default function Academic() {
  const semesters = ["sem1", "sem2", "sem3", "sem4", "sem5", "sem6", "sem7"];

  const subjectstoSemester = {
    sem1: ["Subject 1A", "Subject 1B", "Subject 1C"],
    sem2: ["Subject 2A", "Subject 2B", "Subject 2C"],
    sem3: ["Subject 3A", "Subject 3B", "Subject 3C"],
    sem4: ["Subject 4A", "Subject 4B", "Subject 4C"],
    sem5: ["Subject 5A", "Subject 5B", "Subject 5C"],
    sem6: ["Subject 6A", "Subject 6B", "Subject 6C"],
    sem7: ["Subject 7A", "Subject 7B", "Subject 7C"],
    sem8: ["Subject 8A", "Subject 8B", "Subject 8C"],
  };

  const userdetails = JSON.parse(localStorage.getItem("user"));
  const email = userdetails.email;
  // console.log(userdetails);
  // console.log("email", email);
  const [academics, setAcademics] = useState({
    email,
    sscMarks: "",
    educationType: "",
    board12thMarks: "",
    diplomaMarks: "",
    branch: "",
    yearOfStudy: "", // Add yearOfStudy field
    // Add fields for GPA and Percentage for each semester
    semesters: {
      "TE passed": {
        firstSemGPA: "",
        secondSemGPA: "",
        thirdSemGPA: "",
        fourthSemGPA: "",
        fifthSemGPA: "",
        sixthSemGPA: "",
      },
      BE: {
        seventhSemGPA: "",
      },
    },
    backlogs: [
      {
        semester: "",
        subject: "",
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAcademics({
      ...academics,
      [name]: value,
    });
  };

  // Define additional fields based on educationType
  const additionalFields = {
    diploma: "diplomaMarks",
    board: "board12thMarks",
  };

  const handleBranchChange = (e) => {
    const value = e.target.value;
    setAcademics({
      ...academics,
      branch: value,
    });
  };

  const handleYearOfStudyChange = (e) => {
    const value = e.target.value;
    setAcademics({
      ...academics,
      yearOfStudy: value,
    });
  };

  const [backlogInput, setBacklogInput] = useState({
    semester: "",
    subject: "",
  });

  const handleBacklogInputChange = (e) => {
    const { name, value } = e.target;
    setBacklogInput({
      ...backlogInput,
      [name]: value,
    });
  };

  const handleAddBacklog = () => {
    if (backlogInput.semester && backlogInput.subject) {
      setAcademics((prevAcademics) => ({
        ...prevAcademics,
        backlogs: [...prevAcademics.backlogs, backlogInput],
      }));
      setBacklogInput({
        semester: "",
        subject: "",
      });
    }
  };

  const handleSemesterGPAChange = (semester, value) => {
    setAcademics((prevState) => ({
      ...prevState,
      semesters: {
        ...prevState.semesters, // Corrected from prevState.semesterList
        [academics.yearOfStudy]: {
          ...prevState.semesters[academics.yearOfStudy], // Corrected from prevState.semesterList
          [semester]: value,
        },
      },
    }));
  };

  const handleBacklogChange = (index, value) => {
    const updatedBacklogs = [...academics.backlogs];
    updatedBacklogs[index] = value;
    setAcademics({ ...academics, backlogs: updatedBacklogs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("academics", academics);

    try {
      const response = await fetch("http://localhost:5000/api/form/academics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(academics),
      });

      if (!response) {
        return res.status(402).json(err);
      }

      console.log("Data stored successfully", response);
    } catch (error) {
      console.log("Academic error", error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 mx-auto w-full max-w-7xl bg-slate-100 py-2">
        <div className="mx-auto my-4 max-w-2xl md:my-6">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-xl bg-white p-4 shadow"
          >
            <p className="text-sm font-bold text-gray-900">Academic Details</p>
            <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
              <div className="col-span-2 grid">
                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="sscMarks"
                  >
                    SSC Marks
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    name="sscMarks"
                    value={academics.sscMarks}
                    onChange={handleInputChange}
                    placeholder="Enter SSC Marks"
                    id="sscMarks"
                  />
                </div>
              </div>

              <div className="col-span-2 grid">
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
                    value={academics.educationType}
                    onChange={handleInputChange}
                    name="educationType"
                  >
                    <option value="">Select Education Type</option>
                    <option value="diploma">Diploma</option>
                    <option value="board">Board</option>
                  </select>
                </div>

                {academics.educationType && (
                  <div className="w-full mb-4">
                    <label
                      htmlFor={additionalFields[academics.educationType]}
                      className="block text-sm font-medium leading-none"
                    >
                      {academics.educationType === "diploma"
                        ? "Diploma Marks (%)"
                        : "12th Standard Marks (%)"}
                    </label>
                    <input
                      type="number" // Change type to "number"
                      id={additionalFields[academics.educationType]}
                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder={`Enter ${
                        academics.educationType === "diploma"
                          ? "Diploma"
                          : "12th Standard"
                      } Marks`}
                      name={additionalFields[academics.educationType]}
                      value={
                        academics[additionalFields[academics.educationType]]
                      }
                      onChange={handleInputChange}
                      step="0.01" // Allow two decimal places
                    />
                  </div>
                )}
              </div>

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
                    name="branch"
                    value={academics.branch}
                    onChange={handleBranchChange}
                  >
                    <option value="">Select Branch</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">
                      Information Technology
                    </option>
                    <option value="Electronics and Telecommunications Engineering">
                      Electronics and Telecommunications Engineering
                    </option>
                    <option value="Mechanical Engineering">
                      Mechanical Engineering
                    </option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Artificial Intelligence and Data Science Engineering">
                      Artificial Intelligence and Data Science Engineering
                    </option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                {/* Add other input fields */}
              </div>

              {/* Year or semester wise GPA */}
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
                    value={academics.yearOfStudy}
                    onChange={handleYearOfStudyChange}
                  >
                    <option value="">Select Year of Study</option>
                    <option value="TE passed">TE passed</option>
                    <option value="BE">BE</option>
                  </select>
                </div>
              </div>

              {academics.yearOfStudy && (
                <div className="col-span-2 grid">
                  {academics.yearOfStudy === "TE passed" ? (
                    <>
                      <div className="w-full mb-4">
                        <label
                          htmlFor="firstSemGPA"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          1st Semester GPA
                        </label>
                        <input
                          type="text"
                          id="firstSemGPA"
                          name="firstSemGPA"
                          value={
                            academics.semesters["TE passed"]["firstSemGPA"]
                          }
                          onChange={(e) =>
                            handleSemesterGPAChange(
                              "firstSemGPA",
                              e.target.value
                            )
                          }
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
                          value={academics.semesters["TE passed"]["2ndSemGPA"]}
                          onChange={(e) =>
                            handleSemesterGPAChange("2ndSemGPA", e.target.value)
                          }
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
                          htmlFor="thirdSemGPA"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          3rd Semester GPA
                        </label>
                        <input
                          type="text"
                          id="thirdSemGPA"
                          name="thirdSemGPA"
                          value={
                            academics.semesters["TE passed"]["thirdSemGPA"]
                          }
                          onChange={(e) =>
                            handleSemesterGPAChange(
                              "thirdSemGPA",
                              e.target.value
                            )
                          }
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
                          htmlFor="fourthSemGPA"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          4th Semester GPA
                        </label>
                        <input
                          type="text"
                          id="fourthSemGPA"
                          name="fourthSemGPA"
                          value={
                            academics.semesters["TE passed"]["fourthSemGPA"]
                          }
                          onChange={(e) =>
                            handleSemesterGPAChange(
                              "fourthSemGPA",
                              e.target.value
                            )
                          }
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
                          htmlFor="fifthSemGPA"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          5th Semester GPA
                        </label>
                        <input
                          type="text"
                          id="fifthSemGPA"
                          name="fifthSemGPA"
                          value={
                            academics.semesters["TE passed"]["fifthSemGPA"]
                          }
                          onChange={(e) =>
                            handleSemesterGPAChange(
                              "fifthSemGPA",
                              e.target.value
                            )
                          }
                          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter 5th Semester GPA"
                        />
                        <label
                          htmlFor="5thSemPercentage"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Percentage
                        </label>
                        <input
                          type="text"
                          id="5thSemPercentage"
                          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter Percentage"
                        />
                      </div>
                      <div className="w-full mb-4">
                        <label
                          htmlFor="fourthSemGPA"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          6th Semester GPA
                        </label>
                        <input
                          type="text"
                          id="sixthSemGPA"
                          name="sixthSemGPA"
                          value={
                            academics.semesters["TE passed"]["sixthSemGPA"]
                          }
                          onChange={(e) =>
                            handleSemesterGPAChange(
                              "sixthSemGPA",
                              e.target.value
                            )
                          }
                          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter 6th Semester GPA"
                        />
                        <label
                          htmlFor="6thSemPercentage"
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
                    </>
                  ) : (
                    <>
                      <div className="w-full mb-4">
                        <label
                          htmlFor="seventhSemGPA"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          7th Semester GPA
                        </label>
                        <input
                          type="text"
                          id="seventhSemGPA"
                          name="seventhSemGPA"
                          value={academics.semesters["BE"]["seventhSemGPA"]}
                          onChange={(e) =>
                            handleSemesterGPAChange(
                              "seventhSemGPA",
                              e.target.value
                            )
                          }
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
                    </>
                  )}
                </div>
              )}

              {/* Backlog section */}
              <div className="col-span-2 grid">
                <div className="w-full mb-4">
                  <label
                    htmlFor="backlogSemester"
                    className="block text-sm font-medium leading-none"
                  >
                    Backlog Semester
                  </label>
                  <input
                    type="text"
                    id="backlogSemester"
                    name="semester"
                    value={backlogInput.semester}
                    onChange={handleBacklogInputChange}
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter Semester"
                  />
                </div>
                <div className="w-full mb-4">
                  <label
                    htmlFor="backlogSubject"
                    className="block text-sm font-medium leading-none"
                  >
                    Backlog Subject
                  </label>
                  <input
                    type="text"
                    id="backlogSubject"
                    name="subject"
                    value={backlogInput.subject}
                    onChange={handleBacklogInputChange}
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter Subject"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddBacklog}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Backlog
                </button>
              </div>

              {/* Display Backlogs */}
              <div className="col-span-2 grid">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Semester</th>
                      <th className="px-4 py-2">Subject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {academics.backlogs.map((backlog, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{backlog.semester}</td>
                        <td className="border px-4 py-2">{backlog.subject}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="col-span-2 grid">
                <button
                  type="submit"
                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

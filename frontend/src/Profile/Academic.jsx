import React, { useState } from "react";
// import MyComponent from "./MyComponent.jsx";
// import MyComponent1 from "./MyComponent1.jsx";
// import MyComponent2 from "./MyComponent2.jsx";
import Sidebar from "./SideBar";
import "../Profile/Form.css";
import { toast } from "react-toastify";
import Api from "../api";

export default function Academic() {
  const semesters = ["sem1", "sem2", "sem3", "sem4", "sem5"];

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
    semesters: {
      sem1: { GPA: "", percentage: "" },
      sem2: { GPA: "", percentage: "" },
      sem3: { GPA: "", percentage: "" },
      sem4: { GPA: "", percentage: "" },
      sem5: { GPA: "", percentage: "" },
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
        backlogs: [...prevAcademics.backlogs, backlogInput], // Append new backlog to existing array
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
        ...prevState.semesters,
        [semester]: {
          ...prevState.semesters[semester], // Ensure semester exists before accessing GPA property
          GPA: value,
          percentage: calculatePercentage(value),
        },
      },
    }));
  };

  const calculatePercentage = (GPA) => {
    const minGPA = 1;
    const maxGPA = 10;

    if (GPA >= minGPA && GPA <= maxGPA) {
      const percentage = ((GPA - minGPA) / (maxGPA - minGPA)) * 100;
      return percentage.toFixed(2);
    } else {
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("academics", academics);

    // if (
    //   !academics.sscMarks &&
    //   !academics.educationType &&
    //   (!academics.board12thMarks || !academics.diplomaMarks) &&
    //   !academics.branch &&
    //   !academics.board12thMarks &&
    //   !academics.diplomaMarks &&
    //   !academics.semesters
    // ) {
    //   toast.error("All fields are required!");
    //   return;
    // }

    // If all fields are empty, it's likely a new user registration
    if (
      Object.keys(academics).every(
        (key) => !academics[key] && key !== "semesters" && key !== "backlogs"
      ) &&
      Object.keys(academics.semesters).every(
        (semester) =>
          !academics.semesters[semester].GPA &&
          !academics.semesters[semester].percentage
      ) &&
      academics.backlogs.length === 1 &&
      academics.backlogs[0].semester === "" &&
      academics.backlogs[0].subject === ""
    ) {
      // Handle new user registration
      await Api.createAcademic(academics)
        .then((res) => {
          console.log(res);
          toast.success(res.response.data.message);
          setAcademics({
            email,
            sscMarks: "",
            educationType: "",
            board12thMarks: "",
            diplomaMarks: "",
            branch: "",
            semesters: {
              sem1: { GPA: "", percentage: "" },
              sem2: { GPA: "", percentage: "" },
              sem3: { GPA: "", percentage: "" },
              sem4: { GPA: "", percentage: "" },
              sem5: { GPA: "", percentage: "" },
            },
            backlogs: [
              {
                semester: "",
                subject: "",
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
      return;
    }

    // Create an object to store only the fields that have been modified
    const updatedAcademic = {
      ...academics,
    };

    await Api.createAcademic(updatedAcademic)
      .then((res) => {
        console.log(res);
        // Reset the form fields after successful submission
        setAcademics({
          email,
          sscMarks: "",
          educationType: "",
          board12thMarks: "",
          diplomaMarks: "",
          branch: "",
          semesters: {
            sem1: { GPA: "", percentage: "" },
            sem2: { GPA: "", percentage: "" },
            sem3: { GPA: "", percentage: "" },
            sem4: { GPA: "", percentage: "" },
            sem5: { GPA: "", percentage: "" },
          },
          backlogs: [
            {
              semester: "",
              subject: "",
            },
          ],
        });
        toast.success("Academics updated successfully.");
      })
      .catch((err) => {
        console.log("Error updating academics:", err);
        toast.error("Failed to update academic. Please try again.");
      });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 mx-auto w-full max-w-7xl bg-slate-100 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <div className="mx-auto my-4 max-w-2xl md:my-6">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden shadow bg-opacity-60 backdrop-filter backdrop-blur-lg backdrop-saturate-180 bg-gray-300 border border-opacity-10 border-gray-300 rounded-lg px-5 py-6"
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

              {/* semester wise GPA */}
              <div className="col-span-2 grid">
                {semesters.map((semester) => (
                  <div
                    key={semester}
                    className="w-full mb-4 grid grid-cols-2 gap-x-4"
                  >
                    <div>
                      <label
                        htmlFor={`semGPA_${semester}`}
                        className="text-sm font-medium leading-none"
                      >
                        {semester.toUpperCase()} GPA
                      </label>
                      <input
                        type="text"
                        id={`semGPA_${semester}`}
                        name={`semGPA_${semester}`}
                        value={academics.semesters[semester]?.GPA || ""}
                        onChange={(e) =>
                          handleSemesterGPAChange(semester, e.target.value)
                        }
                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder={`Enter ${semester.toUpperCase()} GPA`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`semPercentage_${semester}`}
                        className="text-sm font-medium leading-none"
                      >
                        Percentage
                      </label>
                      <input
                        type="text"
                        id={`semPercentage_${semester}`}
                        name={`semPercentage_${semester}`}
                        value={calculatePercentage(
                          academics.semesters[semester]?.GPA
                        )}
                        readOnly
                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder={`${semester.toUpperCase()} Percentage`}
                      />
                    </div>
                  </div>
                ))}
              </div>

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
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "../Profile/Form.css";

function MyComponent() {
  const semesters = [
    "sem1",
    "sem2",
    "sem3",
    "sem4",
    "sem5",
    "sem6",
    "sem7",
    "sem8"
  ];

  const subjectsBySemester = {
    sem1: ["Subject 1A", "Subject 1B", "Subject 1C"],
    sem2: ["Subject 2A", "Subject 2B", "Subject 2C"],
    sem3: ["Subject 3A", "Subject 3B", "Subject 3C"],
    sem4: ["Subject 4A", "Subject 4B", "Subject 4C"],
    sem5: ["Subject 5A", "Subject 5B", "Subject 5C"],
    sem6: ["Subject 6A", "Subject 6B", "Subject 6C"],
    sem7: ["Subject 7A", "Subject 7B", "Subject 7C"],
    sem8: ["Subject 8A", "Subject 8B", "Subject 8C"]
  };

  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    if (!selectedSemesters.includes(selectedSemester)) {
      setSelectedSemesters([...selectedSemesters, selectedSemester]);
    }
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    if (!selectedSubjects.includes(selectedSubject)) {
      setSelectedSubjects([...selectedSubjects, selectedSubject]);
    }
  };

  return (
    <div className="col-span-2 grid">
      {/* Dropdown to select semester */}
      <div className="w-full mb-4">
        <label htmlFor="semester" className="block text-sm font-medium leading-none">
          Select Semester(s)
        </label>
        <select
          id="semester"
          multiple
          className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-black/30 focus:border-black/30"
          onChange={handleSemesterChange}
        >
          {semesters.map((semester) => (
            <option key={semester} value={semester}>
              {semester}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown to select subject */}
      <div className="w-full mb-4">
        <label htmlFor="subject" className="block text-sm font-medium leading-none">
          Select Subject(s)
        </label>
        <select
          id="subject"
          multiple
          className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-black/30 focus:border-black/30"
          onChange={handleSubjectChange}
        >
          {selectedSemesters.length > 0 &&
            selectedSemesters.map((semester) =>
              subjectsBySemester[semester].map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))
            )}
        </select>
      </div>

      {/* Display selected semesters and subjects in tabular format */}
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Semester</th>
              <th className="px-4 py-2">Subject</th>
            </tr>
          </thead>
          <tbody>
            {selectedSubjects.map((subject) => (
              <tr key={subject}>
                <td className="border px-4 py-2">
                  {Object.keys(subjectsBySemester).find((key) =>
                    subjectsBySemester[key].includes(subject)
                  )}
                </td>
                <td className="border px-4 py-2">{subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyComponent;

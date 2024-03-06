import React, { useState } from 'react';

const Internships = () => {
  // Declare selectedYear state variable using the useState hook
  const [selectedYear, setSelectedYear] = useState('');

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div>
      <label htmlFor="year">Select Year of Education: </label>
      <select id="year" value={selectedYear} onChange={handleYearChange} className=' w-5'>
        <option value="">Select Year</option>
        <option value="1st">1st Year</option>
        <option value="2nd">2nd Year</option>
        <option value="3rd">3rd Year</option>
        <option value="4th">4th Year</option>
      </select>
      {/* {selectedYear && <p>You selected {selectedYear} year.</p>} */}
    </div>
  );
};

export default Internships;

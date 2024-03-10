// SkillSelect.js
import React, { useState } from 'react';

const Select = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSkillRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {selectedSkills.map((skill, index) => (
        <div key={index} className="bg-blue-500 px-2 py-1 rounded-full text-white">
          {skill}
          <button onClick={() => handleSkillRemove(skill)} className="ml-2 focus:outline-none">
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        placeholder="Type a skill..."
        className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSkillSelect(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
};

export default Select;

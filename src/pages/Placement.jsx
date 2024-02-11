import React, { useState } from "react";
import Card from "../components/Card.jsx";
import { companiesData } from "../dummyData.js";

function Placement() {
  const [list, setList] = useState([...companiesData]);
  const card = list.map((item) => {
    return <Card key={item.id} {...item} />;
  });

  return (
    <div className="flex flex-col flex-1 items-center mb-1 ml-64 py-5">
      <div className="w-4/12 px-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-4xl">{card}</div>
      </div>
    </div>
  );
}

export default Placement;

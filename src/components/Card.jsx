import React from "react";
import svg from "../images/react.svg";

function Card(props) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-white">{props.domain}</h2>
            <h3 className="text-sm text-gray-300">{props.name}</h3>
          </div>
          <img src={svg} alt="" className="h-8 w-8" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h3 className="text-sm text-gray-300">{props.workForm}</h3>
            <h4 className="text-xs text-gray-500">{props.placementDate}</h4>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

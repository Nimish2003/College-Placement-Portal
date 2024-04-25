import React, { useState } from "react";

const branchesData = [
    { id: 'CE', name: 'CE' },
    { id: 'IT', name: 'IT' },
    { id: 'EXTC', name: 'EXTC' },
    { id: 'AI/DS', name: 'AI/DS' },
    { id: 'MECH', name: 'MECH' },
    // Add more branches as needed
];

export default function Company() {
    const [selectedBranches, setSelectedBranches] = useState([]);

    const handleBranchChange = (e) => {
        const branchId = parseInt(e.target.value);
        if (e.target.checked) {
            setSelectedBranches([...selectedBranches, branchId]);
        } else {
            setSelectedBranches(selectedBranches.filter(id => id !== branchId));
        }
    };

    return (
        <div className="mx-auto px-5 md:px-20 w-full md:my-6">
            {/* Form */}
            <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
                <p className="text-sm font-bold text-gray-900">Company Details</p>
                <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
                    <div className="w-full">
                        <input
                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            placeholder="Company Name"
                            id="Companyname"
                        ></input>
                    </div>

                    <div className="w-full">
                        <input
                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            placeholder="Location"
                            id="location"
                        ></input>
                    </div>

                    <div className="w-full">
                        <input
                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            placeholder="Criteria"
                            id="criteria"
                        ></input>
                    </div>

                    <div className="w-full">
                        <input
                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            placeholder="Description"
                            id="description"
                        ></input>
                    </div>

                    <div className="w-full">
                        <div className="mt-1">
                            <input
                                type="date"
                                name="expiration-date"
                                id="expiration-date"
                                autoComplete="cc-exp"
                                className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="col-span-2 grid">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Branches:</label>
                        {branchesData.map(branch => (
                            <div key={branch.id}>
                                <input
                                    type="checkbox"
                                    id={`branch-${branch.id}`}
                                    value={branch.id}
                                    checked={selectedBranches.includes(branch.id)}
                                    onChange={handleBranchChange}
                                />
                                <label 
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor={`branch-${branch.id}`}>{branch.name}</label>
                            </div>
                        ))}
                    </div>

                    <div className="col-span-2 grid">
                        <button
                            type="button"
                            className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from "react";

export default function EditProfileForm() {
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    address: "",
    contactNumber: "",
  });

  // handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(register);

    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });

      console.log("Registered Successfully", response);
    } catch (error) {
      console.log("Register error", error);
    }
  };

  return (
        <form
      onSubmit={handleSubmit}
      className="ml-auto mr-auto mt-10 my-4 w-[calc(100%-64rem)]"
    >
          <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
            <p className="text-sm font-bold text-gray-900">Personal Info</p>
            <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your first name"
                  id="firstName"
              name="firstName"
              value={register.firstName}
              onChange={handleInput}
                ></input>
              </div>

              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your last name"
                  id="lastName"
              name="lastName"
              value={register.lastName}
              onChange={handleInput}
                ></input>
              </div>
              <div className="col-span-2 grid">
                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                name="email"
                value={register.email}
                onChange={handleInput}
                  ></input>
                </div>
              </div>

          <div className="col-span-2 grid">
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your address"
                id="address"
                name="address"
                value={register.address}
                onChange={handleInput}
              ></input>
            </div>
          </div>

          <div className="col-span-2 grid">
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="tel"
              >
                Contact Number
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="tel"
                placeholder="Enter your contact number"
                id="contactNumber"
                name="contactNumber"
                value={register.contactNumber}
                onChange={handleInput}
              ></input>
            </div>
          </div>

          <div className="col-span-2 grid">
            <label
              htmlFor="DOB"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth (DD/MM/YY)
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="dob"
                id="dob"
                autoComplete="cc-exp"
                className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                value={register.dob}
                onChange={handleInput}
              />
            </div>
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
      </div>
    </form>
  );
}

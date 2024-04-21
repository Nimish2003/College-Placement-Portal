import React, { useState } from "react";
import CoverPhoto from "../images/rgit.jpg";
import { toast } from "react-toastify";
import Api from "../api";

export default function EditProfileForm() {
  const userdetails = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: userdetails.email,
    dob: "",
    address: "",
    contactNumber: "",
  });

  // handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //new function:
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profile);

    if (
      !profile.firstName ||
      !profile.lastName ||
      !profile.dob ||
      !profile.address ||
      !profile.contactNumber
    ) {
      toast.error("All fields are required!");
      return;
    }

    // Create an object to store only the fields that have been modified
    const updatedProfile = {};
    Object.keys(profile).forEach((key) => {
      if (profile[key]) {
        updatedProfile[key] = profile[key];
      }
    });

    // If all fields are empty, it's likely a new user registration
    if (Object.keys(updatedProfile).length === 0) {
      // Handle new user registration
      await Api.editProfile(profile)
        .then((res) => {
          console.log(res);
          setProfile({
            firstName: "",
            lastName: "",
            email: "",
            dob: "",
            address: "",
            contactNumber: "",
          });
          toast.success("Profile created successfully.");
        })
        .catch((error) => {
          console.error("Error creating profile:", error);
          toast.error("Failed to create profile. Please try again.");
        });
      return;
    }


    // Check if email has been modified
    if (profile.email !== userdetails.email) {
      toast.error("Enter valid email");
      return;
    }

    await Api.editProfile(updatedProfile)
    .then((res) => {
      console.log(res);
      // Update only the fields that have been modified
      const resetProfile = {};
      Object.keys(profile).forEach((key) => {
        if (updatedProfile[key]) {
          resetProfile[key] = "";
        } else {
          resetProfile[key] = profile[key];
        }
      });
      setProfile(resetProfile);
      toast.success("Profile updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    });
  
  };

  return (
    <div className="ml-auto mr-auto mt-10 my-4 w-[calc(100%-64rem)] bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl bg-white p-4 shadow"
      >
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
              value={profile.firstName}
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
              value={profile.lastName}
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
                value={profile.email}
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
                value={profile.address}
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
                value={profile.contactNumber}
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
                value={profile.dob}
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
      </form>
    </div>
  );
}

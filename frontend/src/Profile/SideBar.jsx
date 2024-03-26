import Profile from "../images/profile.jpeg";
import React from "react";
import "../Profile/Form.css";
import {
  BarChart,
  Wallet,
  Newspaper,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
  CameraIcon,
  BookA,
  BookOpen,
  GraduationCap,
  Target,
  FileClock,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 flex flex-col border-r bg-[#0099ff] px-5 py-8">
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">
              Hi, Lakshit Sahani
            </label>

            {/* Displaying the photo */}
            <img
              src={Profile}
              alt="User Photo"
              className="w-40 h-40 rounded-full mx-auto"
            />

            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              href="#"
            >
              <CameraIcon className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">
                Update Profile Picture
              </span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/academic"
            >
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">
                Academic Information
              </span>
            </a>

            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">
                Profile Information
              </span>
            </a>
          </div>
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">
              Account
            </label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Resume/Cv</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Target className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Job Preferences</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <FileClock className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">
                Application History
              </span>
            </a>
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">
              Customization
            </label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Brush className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Themes</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Wrench className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Settings</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Logout</span>
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}

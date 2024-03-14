import React from "react";
import Select from "../components/Select";
import ProjectForm from "./ProjectForm";
import Certificate from "./Certificate";

export default function Professional() {
  return (
    <div className="mx-auto w-full max-w-7xl bg-slate-100 py-2">
      <div className="mx-auto my-4 max-w-2xl md:my-6">
        {/* Form */}
        <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
          <p className="text-sm font-bold text-gray-900">
            Professional Experience
          </p>
          <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            <div className="col-span-2 grid">
              <label htmlFor="skill">Skills</label>
              <Select />
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="internships"
                >
                  Internships (if any)
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter internship details"
                  id="internships"
                  name="internships"
                />
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="previousExperience"
                >
                  Previous Work Experience
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter previous work experience details"
                  id="previousExperience"
                  name="previousExperience"
                />
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="partTimeJobs"
                >
                  Part-time Jobs or Freelance Work
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter part-time jobs or freelance work details"
                  id="partTimeJobs"
                  name="partTimeJobs"
                />
              </div>
            </div>

            <p className="text-sm font-bold text-gray-900">
              Skills and Technologies
            </p>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="technicalSkills"
                >
                  Technical Skills
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your technical skills"
                  id="technicalSkills"
                  name="technicalSkills"
                />
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="softSkills"
                >
                  Soft Skills
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your soft skills"
                  id="softSkills"
                  name="softSkills"
                />
              </div>
            </div>

            <div className="col-span-2 grid">
              <p className="text-sm font-bold text-gray-900">Projetcs</p>
            <ProjectForm />
            </div>
            
            <div className="col-span-2 grid">
              <p className="text-sm font-bold text-gray-900">Certifications</p>
            <Certificate />
            </div>
            

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="resume"
                >
                  Upload Resume/CV
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="file"
                  accept=".pdf, .doc, .docx" // Allow only PDF and Word document formats
                  id="resume"
                  name="resume"
                />
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="areasOfInterest"
                >
                  Areas of Interest
                </label>
                <textarea
                  className="flex h-20 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your areas of interest, separate multiple values with commas"
                  id="areasOfInterest"
                  name="areasOfInterest"
                ></textarea>
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="preferredIndustry"
                >
                  Preferred Industry or Sector
                </label>
                <textarea
                  className="flex h-20 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter preferred industry or sector, separate multiple values with commas"
                  id="preferredIndustry"
                  name="preferredIndustry"
                ></textarea>
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="jobRoles"
                >
                  Specific Job Roles or Functions of Interest
                </label>
                <textarea
                  className="flex h-20 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter specific job roles or functions, separate multiple values with commas"
                  id="jobRoles"
                  name="jobRoles"
                ></textarea>
              </div>
            </div>

            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="preferredLocations"
                >
                  Preferred Locations
                </label>
                <textarea
                  className="flex h-20 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter preferred locations, separate multiple values with commas"
                  id="preferredLocations"
                  name="preferredLocations"
                ></textarea>
              </div>
            </div>


            <div className="w-full">
              <label
                className="block text-sm font-medium leading-none text-gray-700"
                htmlFor="languagesSpoken"
              >
                Languages Spoken
              </label>
              <input
                id="languagesSpoken"
                name="languagesSpoken"
                className="w-full h-10 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
                placeholder="List the languages spoken"
              />
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-medium leading-none text-gray-700"
                htmlFor="extracurricularActivities"
              >
                Extracurricular Activities
              </label>
              <input
                id="extracurricularActivities"
                name="extracurricularActivities"
                className="w-full h-10 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
                placeholder="List your extracurricular activities"
              />
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-medium leading-none text-gray-700"
                htmlFor="achievementsAwards"
              >
                Achievements or Awards
              </label>
              <input
                id="achievementsAwards"
                name="achievementsAwards"
                className="w-full h-10 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
                placeholder="List your achievements or awards"
              />
            </div>

            <div className="w-full">
        <label
          className="block text-sm font-medium leading-none text-gray-700"
          htmlFor="professionalProfileLink"
        >
          Professional Profile Link
        </label>
        <input
          id="professionalProfileLink"
          name="professionalProfileLink"
          className="w-full h-10 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
          placeholder="Provide a link to your professional profile (e.g., LinkedIn)"
        />
      </div>

      <div className="w-full">
        <label
          className="block text-sm font-medium leading-none text-gray-700"
          htmlFor="references"
        >
          References
        </label>
        <textarea
          id="references"
          name="references"
          className="w-full h-20 px-3 mt-1 text-sm placeholder-gray-600 border rounded-md focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30"
          placeholder="Provide references from professors, mentors, or previous employers"
        />
      </div>

            <div className="col-span-2 grid">
              <button
                type="button"
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

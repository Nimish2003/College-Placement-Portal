import { Academics } from "../models/user/academics.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { uploadOnCloudinary } from "../utils/upload.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
const academics = asyncHandler(async (req, res) => {
    // 1. Get academic details from the frontend
    const {
        email,
        sscMarks,
        educationType,
        board12thMarks,
        diplomaMarks,
        branch,
        yearOfStudy,
        semesters,
        backlogs
    } = req.body;

    // 2. Validation - Ensure all required fields are provided
    if (!email || !sscMarks || !educationType || !branch || !yearOfStudy || !semesters || !backlogs) {
        throw new ApiError(400, "All fields are required!!");
    }

    // 3. Create academic object - create entry in the database
    const academicData = await Academics.create({
        email,
        sscMarks,
        educationType,
        board12thMarks,
        diplomaMarks,
        branch,
        yearOfStudy,
        semesters,
        backlogs
    });

    // 4. Check for academic data creation
    if (!academicData) {
        throw new ApiError("Something went wrong while registering academic data!!");
    }

    // 5. Return response
    return res.status(201).json(new ApiResponse(200, academicData, "Academic data registered successfully"));
});

export { academics };

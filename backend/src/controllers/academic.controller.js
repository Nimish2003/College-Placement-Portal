import { Academics } from "../models/user/academics.model.js";

const academics = async (req, res) => {
    try {
        // Extract user's email from the request or response
        const userEmail = req.body.email || req.body.userEmail;

        // Check if userEmail is provided
        if (!userEmail) {
            throw new Error("User's email not provided");
        }

        const academicData = req.body;

        // Ensure that email is provided in academicData
        academicData.email = userEmail;

        // Create instance of Academics model
        await Academics.create(academicData);
        
        res.status(201).json({ "message": "Data added successfully!" });
    } catch (error) {
        res.status(409).json({ "error": error.message });
    }
}


export {academics};
import Candidate from "../modals/Candidate.js";

export const searchCandidates = async (req, res) => {
    try {
        const { query } = req.query;

        console.log(query, ' asda smmmmm');
        // Case-insensitive partial match on full_name
        const candidates = await Candidate.find({
            full_name: { $regex: `^${query}`, $options: "i" },
        });
        console.log(candidates, 'mmmmm');
        res.status(200).json({
            status: 200,
            message: "Candidates fetched successfully.",
            candidates,
        });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


export const addNewLeave = async (req, res) => {
    try {
        const { full_name, email, position, leave_date, resume, leave_reason, department } = req.body;

        // Ensure email is present in the request body before proceeding
        if (!email) {
            return res.status(400).json({
                status: 400,
                message: "Email is required to update leave information.",
            });
        }

        // Constructing the updated fields dynamically based on what was provided
        const updatedFields = {
            ...(full_name && { full_name }),
            ...(email && { email }),
            ...(leave_date && { leave_date }),
            ...(department && { department }),
            ...(position && { position }),
            ...(resume && { resume }),
            ...(leave_reason && { leave_reason }),
        };

        // Update the candidate's leave information based on the email (assuming you use email to find the candidate)
        const updatedCandidate = await Candidate.findOneAndUpdate(
            { email },  // Filter by email
            { $set: updatedFields },  // Update the relevant fields
            { new: true }  // Return the updated document
        );

        // If no candidate is found with the provided email
        if (!updatedCandidate) {
            return res.status(404).json({
                status: 404,
                message: "Candidate not found with the provided email.",
            });
        }

        console.log(updatedCandidate, 'Updated Candidate');  // For debugging purposes (can be removed in production)

        // Respond with the updated candidate information
        return res.status(200).json({
            status: 200,
            message: "Leave information updated successfully.",
            candidate: updatedCandidate,
        });

    } catch (error) {
        console.error("Error updating leave information:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


export const updateLeaveStatus = async (req, res) => {
    try {
        const { query } = req.query;

        console.log(query, ' asda smmmmm');
        // Case-insensitive partial match on full_name

        console.log(candidates, 'mmmmm');
        res.status(200).json({
            status: 200,
            message: "Candidates fetched successfully.",
            candidates,
        });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
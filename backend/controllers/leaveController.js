import Leave from "../modals/Leave.js";
import Candidate from "../modals/Candidate.js";

export const searchCandidates = async (req, res) => {
    try {
        const { query, type } = req.query;
        // const { type } = req.params;
        console.log(type, 'typeeeeeeeeee');

        // Ensure the query parameter is provided
        if (!query) {
            return res.status(400).json({
                status: 400,
                message: "Search query is required.",
            });
        }

        let filter = {
            full_name: { $regex: `^${query}`, $options: "i" }, // Case-insensitive search
        };

        // If type is 'leave', filter for selected candidates
        if (type === "leave") {
            filter.attendance_status = "present";
        }
        console.log(filter, 'pooooooooo');
        // Perform the search with the filter
        const candidates = await Candidate.find(filter);

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


export const getLeaveUsers = async (req, res) => {
    try {
        const leaveAppliedUsers = await Leave.find()
            .populate({
                path: 'candidate',
                // match: { status: 'selected' }
            });

        // Remove leave entries where candidate didn't match (i.e., not selected)
        const filteredUsers = leaveAppliedUsers.filter(leave => leave.candidate);

        res.status(200).json({
            status: 200,
            message: "Leave applied users with selected candidates fetched successfully.",
            users: filteredUsers,
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



export const addLeave = async (req, res) => {
    try {
        const { leave_reason, leave_date, document, leave_status, id } = req.body;

        // Validation (basic)
        if (!leave_reason || !leave_date || !id || !document) {
            return res.status(400).json({
                status: 400,
                message: "Missing required fields.",
            });
        }
        const alreadyApplied = await Leave.findOne({ candidate: id });

        if (alreadyApplied) {
            return res.status(409).json({
                status: 409,
                message: "Leave has already been applied by this candidate.",
            });
        }

        const leaveAppliedUsers = await Leave.find().populate('candidate');
        console.log(leaveAppliedUsers, 'mmmmm');

        const newLeave = new Leave({
            leave_reason,
            leave_date,
            document,
            leave_status,
            candidate: id,
            // employee: employeeId || null, // Optional
        });

        const savedLeave = await newLeave.save();
        console.log(savedLeave, 'pppppp');
        res.status(201).json({
            status: 201,
            message: "Leave request submitted successfully.",
            data: savedLeave,
        });
    } catch (error) {
        console.error("Error adding leave:", error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

import Candidate from "../modals/Candidate.js";
import axios from 'axios';

export const addNewCandidate = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the candidate already exists by email
        const alreadyExist = await Candidate.findOne({ email });
        if (alreadyExist) {
            return res.status(400).json({
                status: 400,
                message: "Candidate already exists.",
            });
        }

        const newCandidate = new Candidate(req.body);

        await newCandidate.save();

        newCandidate.date_of_joining = newCandidate.createdAt;
        await newCandidate.save();

        return res.status(201).json({
            status: 201,
            message: "Candidate added successfully",
            candidate: newCandidate,
        });

    } catch (error) {
        console.error('Error adding candidate:', error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const { type } = req.query;

        let users;

        // Handle different types
        if (type === "candidates") {
            users = await Candidate.find({ status: { $ne: "selected" } });
        } else if (type === "employees") {
            users = await Candidate.find({ status: "selected" });
        } else if (type === "leave") {
            // users = await Candidate.find({ attendance_status: "present" });
            users = await Candidate.find({ leave_status: { $in: ["approve", "reject", "pending"] }, attendance_status: "present" });
        } else if (type === "attendance") {
            users = await Candidate.find({ status: "selected" });
        } else {
            users = await Candidate.find({ status: { $ne: "selected" } });
        }
        return res.status(200).json({
            status: 200,
            message: `${type.charAt(0).toUpperCase() + type.slice(1)} data fetched successfully`,
            users,
        });

    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const findOneUser = async (req, res) => {
    try {
        const { email } = req.params;

        const allUsers = await Candidate.findOne({ email });

        return res.status(201).json({
            status: 201,
            message: "Candidate added successfully",
            users: allUsers,
        });

    } catch (error) {
        console.error('Error adding candidate:', error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
export const updateUserStatus = async (req, res) => {
    try {
        // const { id } = req.params;
        const { email, status } = req.body;

        if (!status || !email) {
            return res.status(400).json({
                status: 400,
                message: "Status or id is required.",
            });
        }

        const updatedUser = await Candidate.findOneAndUpdate(
            { email },
            { status },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                status: 404,
                message: "Candidate not found.",
            });
        }

        return res.status(201).json({
            status: 201,
            message: "Status updated successfully.",
            user: updatedUser,
        });

    } catch (error) {
        console.error('Error updating candidate status:', error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
};



export const updateUser = async (req, res) => {
    try {
        // const { id } = req.params;
        const { id, full_name, email, phone_number, department, status, position, date_of_joining, experience, resume, leave_reason, leave_date, leave_doc, leave_status, attendance_status, attendance_task } = req.body;
        // const { id } = req.params;,

        const updatedFields = {
            ...(full_name && { full_name }),
            ...(email && { email }),
            ...(phone_number && { phone_number }),
            ...(department && { department }),
            ...(status && { status }),
            ...(experience && { experience }),
            ...(position && { position }),
            ...(date_of_joining && { date_of_joining }),
            ...(resume && { resume }),
            ...(leave_reason && { leave_reason }),
            ...(leave_date && { leave_date }),
            ...(leave_doc && { leave_doc }),
            ...(leave_status && { leave_status }),
            ...(attendance_status && { attendance_status }),
            ...(attendance_task && { attendance_task })
        };
        // console.log(process.env.UNSPLASH_ACCESS_KEY, "process.env.UNSPLASH_ACCESS_KEY ");

        if (full_name) {
            const image = await axios.get(`https://api.unsplash.com/photos/random?query=face&client_id=${process.env.UNSPLASH_ACCESS_KEY}&sig=${Math.floor(Math.random() * 1000)}`);
            updatedFields.profile = image.data.urls.small;
        }
        const existingUser = await Candidate.findById(id);
        if (!existingUser) {
            return res.status(404).json({
                status: 404,
                message: "Candidate not found.",
            });
        }
        const hasChanges = Object.keys(updatedFields).some(key => {
            return updatedFields[key] !== existingUser[key]?.toString();
        });

        if (!hasChanges) {
            return res.status(400).json({
                status: 400,
                message: "No actual changes detected in fields.",
            });
        }
        const updatedUser = await Candidate.findOneAndUpdate(
            { _id: id },
            updatedFields,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                status: 404,
                message: "Candidate not found.",
            });
        }

        return res.status(201).json({
            status: 201,
            message: "Status updated successfully.",
            user: updatedUser,
        });

    } catch (error) {
        console.error('Error updating candidate status:', error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        // const { id } = req.params;
        // const { full_name, email, phone_number, department, position, date_of_joining } = req.body;
        const { id } = req.params;


        const deletedUser = await Candidate.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(201).json({
            status: 201,
            message: "Status updated successfully.",
            user: deletedUser,
        });

    } catch (error) {
        console.error('Error updating candidate status:', error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
};
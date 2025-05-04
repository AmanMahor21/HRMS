import Candidate from "../modals/Candidate.js";

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

        let query = {};

        // Handle different types
        if (type === "candidates") {
            query = {}; // Get all candidates
        } else if (type === "employees") {
            query = { status: "selected" }; // Get selected employees
        } else if (type === "leave") {
            query = { leave_date: { $exists: true, $ne: null } }; // Get users with leave_date
        } else {
            return res.status(400).json({
                status: 400,
                message: "Invalid type. Must be 'candidate', 'employee', or 'left'.",
            });
        }

        const allUsers = await Candidate.find(query);

        return res.status(200).json({
            status: 200,
            message: `${type.charAt(0).toUpperCase() + type.slice(1)} data fetched successfully`,
            users: allUsers,
        });

    } catch (error) {
        console.error('Error fetching users:', error);
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
        console.log(allUsers, 'sssssss');

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



export const editUser = async (req, res) => {
    try {
        // const { id } = req.params;
        const { id, full_name, email, phone_number, department, position, date_of_joining } = req.body;
        // const { id } = req.params;

        console.log(id, 'xxx');
        const updatedFields = {
            ...(full_name && { full_name }),
            ...(email && { email }),
            ...(phone_number && { phone_number }),
            ...(department && { department }),
            ...(experience && { experience }),
            ...(position && { position }),
            ...(date_of_joining && { date_of_joining }),
        };

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

        console.log(id, 'xxx');

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
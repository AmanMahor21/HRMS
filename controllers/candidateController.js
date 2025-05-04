import Candidate from "../modals/Candidate.js";

export const addNewCandidate = async (req, res) => {
    try {
        // const {
        //     full_name,
        //     email,
        //     phone_number,
        //     position,
        //     experience,
        //     resume,
        //     status
        // } = req.body;

        const alreadyExist = await Candidate.findOne({ email: req.body.email });
        if (alreadyExist) {
            return res.status(400).json({
                status: 400,
                message: "Candidate already exist",
            });
        }
        const newCandidate = new Candidate(req.body);

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


        const allUsers = await Candidate.find();
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
        const { full_name, email, phone_number, department, position, date_of_joining } = req.body;
        const { id } = req.params;

        console.log(id, 'xxx');
        const updatedFields = {
            ...(full_name && { full_name }),
            ...(email && { email }),
            ...(phone_number && { phone_number }),
            ...(department && { department }),
            ...(position && { position }),
            ...(date_of_joining && { date_of_joining }),
        };

        const updatedUser = await Candidate.findByIdAndUpdate(
            id,
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
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

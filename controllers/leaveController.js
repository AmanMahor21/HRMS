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

import Attendance from "../modals/Attendance.js";
import Candidate from "../modals/Candidate.js"; // Make sure you have this import


export const updateAttendance = async (req, res) => {
    try {
        const { email, task, attendance_status } = req.body;

        if (!email) {
            return res.status(400).json({
                status: 400,
                message: "Email is required.",
            });
        }

        // Check if candidate exists
        const candidate = await Candidate.findOne({ email });
        if (!candidate) {
            return res.status(400).json({
                status: 400,
                message: "Employee not found.",
            });
        }

        // Check for existing attendance (irrespective of date)
        const existingAttendance = await Attendance.findOne({
            candidate: candidate._id,
        });

        if (existingAttendance) {
            return res.status(409).json({
                status: 409,
                message: "Attendance already marked for this candidate.",
            });
        }

        // Create new attendance
        const newAttendance = new Attendance({
            task,
            attendance_status,
            candidate: candidate._id,
        });

        await newAttendance.save();

        return res.status(201).json({
            status: 201,
            message: "Attendance recorded successfully.",
            attendance: newAttendance,
        });

    } catch (error) {
        console.error('Error updating attendance:', error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};



export const getAttendanceUsers = async (req, res) => {
    try {

        const leaveAppliedUsers = await Attendance.find().populate('candidate');
        console.log(leaveAppliedUsers, 'mmmmm');
        res.status(200).json({
            status: 200,
            message: "Leave applied users fetched successfully.",
            users: leaveAppliedUsers,
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
import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
    // full_name: {
    //     type: String,
    //     required: true

    // },
    // designation: {
    //     type: String,
    //     required: true

    // },
    // leave_date: {
    //     type: Number,
    //     required: true,
    //     min: [0, 'Experience must be a non-negative number'],

    // },
    // resume: {
    //     type: String,
    //     required: true
    // },
    // reason: {
    //     type: String,
    //     required: true
    // },
    leave_status: {
        type: String,
        required: true,
        enum: ['approve', "reject"],
        default: 'pending',

    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendance',
        required: true
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },


},
    {
        timestamps: true,
    });

const Leave = mongoose.model("Leave", LeaveSchema);

export default Leave;

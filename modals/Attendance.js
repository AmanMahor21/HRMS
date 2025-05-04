import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema(
    {
        candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Candidate',
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['present', 'absent'],
            default: '',

        },
    },
    {
        timestamps: true,
    }
);

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;

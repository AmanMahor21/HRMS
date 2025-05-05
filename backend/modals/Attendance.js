import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema(
    {
        candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Candidate',
            required: true,
            unique: true,
        },
        task: {
            type: String,
            required: true,
        },
        attendance_status: {
            type: String,
            // required: true,
            enum: ['present', 'absent'],
            default: 'present',
        },

    },
    {
        timestamps: true,
    }
);

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;

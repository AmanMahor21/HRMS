import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,

    },
    phone_number: {
        type: String,
        required: true,
        minlength: 10,
    },
    position: {
        type: String,
        required: true

    },
    experience: {
        type: Number,
        required: true,
        min: [0, 'Experience must be a non-negative number'],

    },
    resume: {
        type: String,
        required: true

    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'scheduled', 'ongoing', 'selected', 'rejected'],
        default: 'new',

    },

},
    {
        timestamps: true,
    });

const Candidate = mongoose.model("Candidate", CandidateSchema);

export default Candidate;

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: false

    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }

},
    {
        timestamps: true,
    });

const User = mongoose.model("User", UserSchema);

export default User;

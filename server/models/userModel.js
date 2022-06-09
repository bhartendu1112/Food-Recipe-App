import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, " Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, " Please enter your password"],
    }
});

export default mongoose.model("user", UserSchema);
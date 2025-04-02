import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName: { type: String, default: '', isUnique: true, required: true},
    password: { type: String, default: '', },
    emailId: { type: String, default: '',isUnique: true, required: true },
    forgotPassword: { type: Boolean, default: false },
    isActive: { type: Boolean, default:true},
});

export default userSchema;
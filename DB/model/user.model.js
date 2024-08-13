import { Schema, model } from "mongoose";

const userSchema = new Schema({
  adminName: {
    type: String,
    required: true,
    unique: true,
  },
  
  adminPassword: {
    type: String,
    required: true,
  },

}, {
  timestamps: true
})


const userModel = model('User', userSchema);
export default userModel
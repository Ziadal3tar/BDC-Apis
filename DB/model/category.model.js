import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true
})


const categoryModel = model('Category', categorySchema);
export default categoryModel
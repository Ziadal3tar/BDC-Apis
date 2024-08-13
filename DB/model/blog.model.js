import { Schema, model } from "mongoose";

const paragraphSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming you store the image URL
  },
  public_id: {
    type: String, // Assuming you store the image URL
  },
});

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming you store the image URL
  },
  public_id: {
    type: String, // Assuming you store the image URL
  },
  paragraphs: {
    type: [paragraphSchema], // Array of objects with title, description, and image
    required: true,
  },
}, {
  timestamps: true,
});


const BlogModel = model('Blog', blogSchema);
export default BlogModel
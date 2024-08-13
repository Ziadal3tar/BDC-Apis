
import blogModel from '../../../../DB/model/blog.model.js';
import { asyncHandler } from '../../../services/asyncHandler.js';
import cloudinary from '../../../services/cloudinary.js'


export const addBlog = asyncHandler(async (req, res, next) => {
  req.body.category = req.body.category[0];
  const { url , numberOfParagraph, blogTitle, blogDescription, category } = req.body;
  let uploadedBlogImage;

  // Upload the main blog image
  for (const file of req.files) {
    if (file.fieldname === 'blogImage') {
      uploadedBlogImage = await cloudinary.uploader.upload(file.path, { folder: 'BDC' });
      break;
    }
  }

  const blogParagraphs = [];
  
  // Upload images and process paragraphs
  for (let i = 1; i <= numberOfParagraph.length - 1; i++) {
    const paragraphTitle = req.body[`paragraph${i}Title`];
    const paragraphDescription = req.body[`paragraph${i}Description`];
    let uploadedParagraphImage;

    for (const file of req.files) {
      if (file.fieldname === `paragraph${i}image`) {
        uploadedParagraphImage = await cloudinary.uploader.upload(file.path, { folder: 'BDC' });
        break;
      }
    }

    // Push the paragraph data to the blogParagraphs array
    blogParagraphs.push({
      title: paragraphTitle,
      description: paragraphDescription,
      image: uploadedParagraphImage?.secure_url || '', // Fallback to empty string if undefined
      public_id: uploadedParagraphImage?.public_id || '', // Fallback to empty string if undefined
    });
  }

  // Create the blog model
  const newBlog = new blogModel({
    title: blogTitle,
    description: blogDescription,
    image: uploadedBlogImage?.secure_url || '', // Fallback to empty string if undefined
    public_id: uploadedBlogImage?.public_id || '', // Fallback to empty string if undefined
    category,
    url,
    paragraphs: blogParagraphs,
  });

  // Save the blog to the database
  await newBlog.save();
  
  // Send response
  res.status(201).json({ message: 'Blog added successfully', blog: newBlog });
});


export const allBlogs = asyncHandler(async (req, res, next) => {
  const allBlogs = await blogModel.find({});
  return res.status(201).json({ allBlogs, message: 'All Blogs' });
});
export const deleteBlog = asyncHandler(async (req, res, next) => {
  let { _id } = req.params

  try {
    const blog = await blogModel.findById(_id);

    if (!blog) {
      throw new Error('Blog not found');
    }

    if (blog.public_id) {
      await cloudinary.uploader.destroy(blog.public_id);
    }

    const deleteParagraphImages = blog.paragraphs.map(paragraph => {
      if (paragraph.public_id) {
        return cloudinary.uploader.destroy(paragraph.public_id);
      }
      return null;
    });

    await Promise.all(deleteParagraphImages);

    await blogModel.findByIdAndDelete(_id);

    res.status(201).json({ message: 'removed' });
  } catch (error) {
    throw error;
  }

})

import { asyncHandler } from '../../../services/asyncHandler.js';
import categoryModel from '../../../../DB/model/category.model.js';


export const addCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.body;
  const existingCategory = await categoryModel.findOne({ category });
  if (existingCategory) {
    return res.status(400).json({ message: 'This category is already exist' });
  } else {
    const createdAdmin = new categoryModel(req.body);
    await createdAdmin.save();
    return res.status(201).json({ createdAdmin, message: 'Category added successfully' });
  }
});
export const removeCategory = asyncHandler(async (req, res, next) => {
  
  const { _id } = req.params;
  const existingCategory = await categoryModel.findOne({ _id  });
  if (existingCategory) {
    let remove = await categoryModel.findByIdAndDelete({_id})
     res.status(201).json({ message: 'removed' });
  } else {
    res.status(404).json({ message: 'not found' });
  }
});
export const allCategory = asyncHandler(async (req, res, next) => {
  const allCategories = await categoryModel.find({});
  return res.status(201).json({ allCategories, message: 'all Category' });
});
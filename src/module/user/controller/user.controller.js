
import { asyncHandler } from '../../../services/asyncHandler.js';
import { findById, findByIdAndDelete, findOneAndUpdate, findOne, find, findByIdAndUpdate, create, findOneAndDelete } from '../../../../DB/DBMethods.js';
import userModel from '../../../../DB/model/user.model.js';


export const addUser = asyncHandler(async (req, res, next) => {
  const { adminName, adminPassword } = req.body;
  const existingUser = await userModel.findOne({ adminName });
  if (existingUser) {
    return res.status(400).json({ message: 'This adminName is already exist' });
  } else {
    const createdAdmin = new userModel(req.body);
    await createdAdmin.save();
    return res.status(201).json({ createdAdmin, message: 'Admin added successfully' });
  }
});
export const logIn = asyncHandler(async (req, res, next) => {
  const { adminName, adminPassword } = req.body;
  const existingUser = await userModel.findOne({ adminName });
  if (existingUser) {
    if (existingUser.adminPassword ==adminPassword ) {
    return res.status(201).json({ success:true });
    }else{
    return res.status(400).json({ message: 'Password Invalid' });

    }
  } else {
    return res.status(400).json({ message: 'This AdminName Not Found' });
  }
});
export const removeUser = asyncHandler(async (req, res, next) => {
  
  const { _id } = req.params;
  const existingUser = await userModel.findOne({ _id  });
  if (existingUser) {
    let remove = await userModel.findByIdAndDelete({_id})
     res.status(201).json({ message: 'removed' });
  } else {
    res.status(404).json({ message: 'not found' });
  }
});
export const allUser = asyncHandler(async (req, res, next) => {
  const allUser = await userModel.find({});
  return res.status(201).json({ allUser, message: 'all User' });
});
import { Router } from "express";
import * as BlogControl from './controller/blog.controller.js'
import { fileValidation, HME, myMulter } from "../../services/multer.js";

const router = Router()
router.get("/", (req, res) => {
    res.status(200).json({ message: 'Blog Module' })
})

router.post("/addBlog",myMulter(fileValidation.all).any(),HME, BlogControl.addBlog)
router.get("/allBlog", BlogControl.allBlogs)
router.get("/deleteBlog/:_id", BlogControl.deleteBlog)

export default router
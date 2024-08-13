import { Router } from "express";
import * as CategoryControl from './controller/category.controller.js'

const router = Router()
router.get("/", (req, res) => {
    res.status(200).json({ message: 'Category Module' })
})

router.post("/addCategory", CategoryControl.addCategory)
router.get("/allCategory", CategoryControl.allCategory)
router.get("/removeCategory/:_id", CategoryControl.removeCategory)

export default router
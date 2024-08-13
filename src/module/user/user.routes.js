import { Router } from "express";
import * as userControl from './controller/user.controller.js'

const router = Router()
router.get("/", (req, res) => {
    res.status(200).json({ message: 'user Module' })
})

router.post("/addUser", userControl.addUser)
router.get("/allUser", userControl.allUser)
router.post("/logIn", userControl.logIn)
router.get("/removeUser/:_id", userControl.removeUser)

export default router
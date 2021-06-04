import express from "express"
import { getUsers, addUser, deleteUser, updateUser, getUser } from "../controller/users.js"

const router = express.Router();

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/', addUser)

router.patch('/:id', updateUser)

router.delete('/:id', deleteUser)

export default router
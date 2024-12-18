import express from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    updatedUser,
    deletedUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updatedUser);
router.delete("/:id", deletedUser);

export default router;

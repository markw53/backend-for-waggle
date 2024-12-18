import express from "express";
import {
    getAllOwners,
    getOwnerById,
    createOwner,
    updateOwner,
    deleteOwner,
} from "../controllers/ownersController.js";

const router = express.Router();

router.get("/", getAllOwners);
router.get("/:id", getOwnerById);
router.post("/", createOwner);
router.patch("/:id", updateOwner);
router.delete("/:id", deleteOwner);

export default router;

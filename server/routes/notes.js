import express from "express";
import { getUserNotes, updateNote, deleteNote } from "../controllers/notes.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId/notes", getUserNotes);
router.patch("/:id/update", verifyToken, updateNote);
router.delete("/:id/note", deleteNote);

export default router;
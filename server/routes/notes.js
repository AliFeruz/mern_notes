import express from "express";
import { getUserNotes, updateNote, deleteNote } from "../controllers/notes.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId/notes", verifyToken, getUserNotes);
router.put("/:id/update",  verifyToken, updateNote);
router.delete("/:id/note", verifyToken, deleteNote);

export default router;
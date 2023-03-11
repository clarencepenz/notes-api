const express = require("express");
const { verifyToken } = require("../controllers/authController");
const noteController = require("../controllers/noteController");

const router = express.Router();

router.get("/", verifyToken, noteController.getNotes);
router.get("/:id", verifyToken, noteController.getNote);
router.post("/", verifyToken, noteController.createNote);
router.put("/:id", verifyToken, noteController.updateNote);
router.delete("/:id", verifyToken, noteController.deleteNote);



module.exports = router

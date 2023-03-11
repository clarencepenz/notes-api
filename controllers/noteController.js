const express = require("express");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");

const app = express();
app.use(express.json());

const notesFile = "notes.json";
let notes = [];

async function loadNotes() {
  try {
    notes = await JSON.parse(fs.readFileSync(notesFile));
  } catch (err) {
    notes = [];
  }
}

function saveNote() {
  fs.writeFileSync(notesFile, JSON.stringify(notes));
}

exports.getNotes = catchAsync(async (req, res) => {
  await res.status(200).json({
    status: "success",
    data: notes,
  });
});

exports.getNote = catchAsync(async (req, res) => {
  const note = notes.find((note) => note.id === req.params.id);

  if (!note) {
    await res.status(404).json({
      status: "error",
      message: "Note not found",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: note,
    });
  }
});

exports.createNote = catchAsync(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    await res.status(400).json({
      status: "error",
      message: "Title and content are required",
    });
  }

  const note = {
    id: Math.random().toString(36).substring(2),
    title,
    content,
    user_id: req.user.id,
  };
  notes.push(note);
  saveNote();
  await res.status(201).json({
    status: "success",
    message: "Note created successfully",
    data: note,
  });
});

exports.updateNote = catchAsync(async (req, res) => {
  const note = notes.find((note) => note.id === req.params.id);

  if (!note) {
    await res.status(404).json({
      status: "error",
      message: "Note not found",
    });
  } else if (note.user_id !== req.user.id) {
    await res.status(403).json({
      status: "error",
      message: "You don't have the permission to update this note",
    });
  } else {
    note.title = req.body.title;
    note.content = req.body.content;
    saveNote();
    await res.status(201).json({
      status: "success",
      message: "Note successfully updated",
      data: note,
    });
  }
});

exports.deleteNote = catchAsync(async (req, res) => {
  const noteIndex = notes.findIndex((note) => note.id === req.params.id);

  if (noteIndex === -1) {
    await res.status(404).json({
      status: "error",
      message: "Note not found",
    });
  } else if (notes[noteIndex].user_id !== req.user.id) {
    await res.status(403).json({
      status: "error",
      message: "You don't have the permission to update this note",
    });
  } else {
    notes.splice(noteIndex, 1);
    saveNote();
    await res.status(200).json({
      status: "success",
      message: "Note successfully deleted",
    });
  }
});

loadNotes();

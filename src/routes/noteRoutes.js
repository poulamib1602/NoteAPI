const express = require('express');
const { getNote, createNote, deleteNote, updateNote } = require('../controllers/noteController');
const auth = require('../middlewares/auth');
const noteRoute = express.Router();

noteRoute.get("/", auth , getNote);
noteRoute.post("/", auth ,createNote);
noteRoute.delete("/:id", auth , deleteNote);
noteRoute.put("/:id", auth , updateNote)
module.exports = noteRoute;
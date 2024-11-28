import express from 'express';
import { Note } from '../models/noteModel.js';  // Note model for database interactions
import { verifyToken } from '../middleware/authMiddleware.js';  // Middleware to verify JWT

const router = express.Router();

// Middleware to verify token for protected routes
router.use(verifyToken);

// Route to create a new note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;  // Get user ID from JWT

  try {
    // Create a new note in the database
    const newNote = await Note.createNote({
      title,
      content,
      userId,
    });

    res.status(201).json({
      message: 'Note created successfully',
      note: newNote,
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all notes for a logged-in user
router.get('/', async (req, res) => {
  const userId = req.user.id;  // Get user ID from JWT

  try {
    // Fetch all notes for the user
    const notes = await Note.getNotesByUserId(userId);

    res.status(200).json({
      notes,
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update a note
router.put('/:id', async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;
  const userId = req.user.id;  // Get user ID from JWT

  try {
    // Find note by ID and check if the user owns the note
    const note = await Note.getNoteById(noteId);
    if (!note || note.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Update the note
    const updatedNote = await Note.updateNote(noteId, { title, content });

    res.status(200).json({
      message: 'Note updated successfully',
      note: updatedNote,
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to delete a note
router.delete('/:id', async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;  // Get user ID from JWT

  try {
    // Find note by ID and check if the user owns the note
    const note = await Note.getNoteById(noteId);
    if (!note || note.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Delete the note
    await Note.deleteNote(noteId);

    res.status(200).json({
      message: 'Note deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as notesRoutes };

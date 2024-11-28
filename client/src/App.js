import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  // Fetch notes from the backend
  useEffect(() => {
    axios.get('http://localhost:8001/api/notes')
      .then((response) => setNotes(response.data))
      .catch((error) => console.error('Error fetching notes:', error));
  }, [notes]);

  // Handle input changes for new note
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  // Handle form submission to create new note
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8001/api/notes', newNote)
      .then((response) => {
        setNotes([...notes, response.data]);
        setNewNote({ title: '', content: '' }); // Clear form
      })
      .catch((error) => console.error('Error adding note:', error));
  };

  // Handle deleting a note
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8001/api/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((error) => console.error('Error deleting note:', error));
  };

  return (
    <div className="App">
      <h1>Note App</h1>
      
      {/* Note Creation Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Note Title"
          value={newNote.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Note Content"
          value={newNote.content}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Note</button>
      </form>

      {/* List of Notes */}
      <div>
        <h2>All Notes</h2>
        {notes.length > 0 ? (
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <button onClick={() => handleDelete(note.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </div>
  );
};

export default App;

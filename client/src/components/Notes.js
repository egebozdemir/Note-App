import React, { useState, useEffect } from "react";
import axios from "axios";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Get JWT token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Send request to fetch notes
      axios
        .get("http://localhost:8001/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setNotes(response.data);
        })
        .catch((err) => {
          console.error("Failed to fetch notes:", err);
        });
    }
  }, []);

  return (
    <div className="notes">
      <h2>My Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;

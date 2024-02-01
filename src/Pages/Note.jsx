import React, { useState } from "react";
import Dashboard from "../commons/Dashboard";
import NoteForm from "../components/NoteComponent/NoteForm";
import NoteList from "../components/NoteComponent/NoteList";
import { Button } from "antd";

function Note() {
  const [notes, setNotes] = useState([]);
  const [openAddNote, setAddNote] = useState(false);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };
  const hanldeAddNote = () => {
    setAddNote((prev) => !prev);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Dashboard>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold mb-4">Notes App</h1>

          <Button
            placeholder="Add Note"
            title="Add Note"
            onClick={hanldeAddNote}
          >
            Add Note
          </Button>
        </div>
        <NoteForm addNote={addNote} visble={openAddNote} />
        <NoteList notes={notes} deleteNote={deleteNote} />
      </div>
    </Dashboard>
  );
}

export default Note;

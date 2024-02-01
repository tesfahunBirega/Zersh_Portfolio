import React, { useState } from "react";
import Dashboard from "../commons/Dashboard";
import NoteForm from "../components/NoteComponent/NoteForm";
import NoteList from "../components/NoteComponent/NoteList";
import { Button } from "antd";
import CategoryTabs from "../components/NoteComponent/CategoryTabs";
import NoteCard from "../components/NoteComponent/NoteCard";

function Note() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Note 1",
      content: "Content of Note 1",
      color: "#ffff99",
      category: "Personal",
    },
    {
      id: 2,
      title: "Note 2",
      content: "Content of Note 2",
      color: "#ffcccc",
      category: "Work",
    },
    {
      id: 3,
      title: "Note 3",
      content: "Content of Note 3",
      color: "#ccffcc",
      category: "Ideas",
    },
    {
      id: 4,
      title: "Note 4",
      content: "Content of Note 4",
      color: "#ccffff",
      category: "Personal",
    },
  ]);
  const categories = ["All", "Personal", "Work", "Ideas"];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNotes =
    selectedCategory === "All"
      ? notes
      : notes.filter((note) => note.category === selectedCategory);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };
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

        <CategoryTabs
          categories={categories}
          onSelectCategory={handleSelectCategory}
        />
        <NoteForm
          addNote={addNote}
          visble={openAddNote}
          setVisble={setAddNote}
        />
        <div className="flex flex-wrap">
          {filteredNotes.map((note) => (
            <NoteCard deleteNote={deleteNote} key={note.id} note={note} />
          ))}
        </div>
      </div>
    </Dashboard>
  );
}

export default Note;

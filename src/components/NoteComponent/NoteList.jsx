// components/NoteList.js
import React from "react";
import { List, Button, Table } from "antd";
import { Link } from "react-router-dom";

const NoteList = ({ notes, deleteNote }) => {
  console.log(notes);
  <div className="mt-4">
    {notes.map((note, index) => (
      <Link
        to={note?._id}
        key={index}
        className="bg-gray-100 p-2 mb-2 flex justify-between items-center"
      >
        <div>{note.text}</div>
        <div>
          <Button type="danger" onClick={() => deleteNote(note.id)}>
            Delete
          </Button>
        </div>
      </Link>
    ))}
  </div>;
};

export default NoteList;

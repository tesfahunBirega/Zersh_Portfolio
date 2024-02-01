// components/NoteList.js
import React from "react";
import { List, Button, Table } from "antd";

const NoteList = ({ notes, deleteNote }) => {
  console.log(notes);
  <div className="mt-4">
    {notes.map((note, index) => (
      <div
        key={index}
        className="bg-gray-100 p-2 mb-2 flex justify-between items-center"
      >
        <div>{note.text}</div>
        <div>
          <Button type="danger" onClick={() => deleteNote(index)}>
            Delete
          </Button>
        </div>
      </div>
    ))}
  </div>;
};

export default NoteList;

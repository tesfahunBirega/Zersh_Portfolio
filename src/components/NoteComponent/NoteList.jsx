// components/NoteList.js
import React from "react";
import { List, Button, Table } from "antd";

const NoteList = ({ notes, deleteNote }) => {
  <List
    className="mt-4"
    bordered
    dataSource={notes}
    renderItem={(note) => (
      <List.Item>
        <div className="flex justify-between w-full">
          <div>
            <p>{note.text}</p>
            <p className="text-xs text-gray-500">{note.category}</p>
          </div>
          <Button type="link" danger onClick={() => handleDeleteNote(note.id)}>
            Delete
          </Button>
        </div>
      </List.Item>
    )}
  />;
};

export default NoteList;

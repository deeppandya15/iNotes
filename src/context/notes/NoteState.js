import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3000";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newNote = await response.json();
    setnotes(notes.concat(newNote));
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const updatedNote = await response.json();

    const newNotes = notes.map((note) =>
      note._id === id ? updatedNote : note
    );
    setnotes(newNotes); // Update state with edited note
  };
  return React.createElement(
    noteContext.Provider,
    { value: { notes, setnotes, addNote, editNote, deleteNote, getNotes } },
    props.children
  );
};

export default NoteState;

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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NjM3MDY3ZmM0YjcyZmI2NzIzOTVhY2IiLCJpYXQiOjE3MTQ4ODIyNDV9.ohXwto4YjXHaWpNFkdmq-e_R2JUkS_AO5vb6UeWOExU",
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NjM3MDY3ZmM0YjcyZmI2NzIzOTVhY2IiLCJpYXQiOjE3MTQ4ODIyNDV9.ohXwto4YjXHaWpNFkdmq-e_R2JUkS_AO5vb6UeWOExU",
      },
      body: JSON.stringify({ title, description, tag }),
    });
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NjM3MDY3ZmM0YjcyZmI2NzIzOTVhY2IiLCJpYXQiOjE3MTQ4ODIyNDV9.ohXwto4YjXHaWpNFkdmq-e_R2JUkS_AO5vb6UeWOExU",
      },
    });
    const json = await response.json();
    console.log(json);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);
  };

  const editNote = async (title, description, id) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NjM3MDY3ZmM0YjcyZmI2NzIzOTVhY2IiLCJpYXQiOjE3MTQ4ODIyNDV9.ohXwto4YjXHaWpNFkdmq-e_R2JUkS_AO5vb6UeWOExU",
      },
    });
    const json = await response.json();
    console.log(json);
  };
  return React.createElement(
    noteContext.Provider,
    { value: { notes, setnotes, addNote, editNote, deleteNote, getNotes } },
    props.children
  );
};

export default NoteState;
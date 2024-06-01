import React, { useContext, useState, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import NotesItem from './NotesItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {

    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    const [noteForEdit, setNoteForEdit] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
        } else {
            navigate("/login")
        }
    }, [navigate]);

    const clearNoteForEdit = () => {
        setNoteForEdit(null);
    };
    return (
        <>
            <AddNote noteForEdit={noteForEdit} clearNoteForEdit={clearNoteForEdit} alertshow={props.alertshow} />
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <NotesItem key={note._id} note={note} setNoteForEdit={setNoteForEdit} alertshow={props.alertshow} />
                    ))
                ) : (
                    <p>No notes to display</p>
                )}
            </div>
        </>
    )
}

export default Notes
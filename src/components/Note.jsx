import React, { useContext, useState, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import NotesItem from './NotesItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    const [noteForEdit, setNoteForEdit] = useState(null);

    useEffect(() => {
        getNotes();
    }, []);

    const clearNoteForEdit = () => {
        setNoteForEdit(null);
    };
    return (
        <>
            <AddNote noteForEdit={noteForEdit} clearNoteForEdit={clearNoteForEdit} />
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NotesItem key={note._id} note={note} setNoteForEdit={setNoteForEdit} />
                })}
            </div>
        </>
    )
}

export default Notes
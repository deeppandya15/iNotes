import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NotesItem from './NotesItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, setnotes, addNote } = context
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NotesItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
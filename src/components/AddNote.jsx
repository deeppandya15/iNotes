import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = ({ noteForEdit, clearNoteForEdit }) => {
    const context = useContext(noteContext);
    const { addNote, editNote, getNotes } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    useEffect(() => {
        if (noteForEdit) {
            setNote(noteForEdit);
        } else {
            setNote({ title: "", description: "", tag: "" });
        }
    }, [noteForEdit]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (noteForEdit) {
            editNote(note._id, note.title, note.description, note.tag);
            clearNoteForEdit();
        } else {
            addNote(note.title, note.description, note.tag);
        }
        setNote({ title: "", description: "", tag: "" });
    };

    const handleonChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        getNotes();
    }, []);


    return (
        <div>
            <div className='container my-3'>
                <h2>{noteForEdit ? "Edit Note" : "Add a Note"}</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="titledesc" onChange={handleonChange} />
                        <div id="titledesc" className="form-text">Write your title here.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} autoComplete='false' onChange={handleonChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} autoComplete='false' onChange={handleonChange} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
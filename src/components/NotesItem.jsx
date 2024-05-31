import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NotesItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, setNoteForEdit } = props;
    return (
        <>

            <div className='col-lg-3 col-md-4 col-sm-6'>
                <div className="card my-3" >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { setNoteForEdit(note) }}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesItem
// import React, { useContext } from 'react';
// import noteContext from '../context/notes/noteContext';

// const NotesItem = (props) => {
//     const context = useContext(noteContext);
//     const { deleteNote } = context;
//     const { note, setNoteForEdit } = props;

//     return (
//         <div className='col-lg-3 col-md-4 col-sm-6'>
//             <div className="card my-3">
//                 <div className="card-body">
//                     <h5 className="card-title">{note.title}</h5>
//                     <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
//                     <p className="card-text">{note.description}</p>
//                     <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }}></i>
//                     <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { setNoteForEdit(note) }}></i>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default NotesItem;

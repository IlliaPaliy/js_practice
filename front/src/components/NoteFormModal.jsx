import "./NoteFormModal.css"

import { Editor } from "primereact/editor"
import { useState } from "react";

export function NoteFormModal({new_id, notes, setNotes, modal_state, setModalState}) {
    const current_note = 
        modal_state.edit !== null ? notes.find(n => n.id == modal_state.edit) : null;
    
    const [title, setTitle] = useState(current_note ? current_note.title : '');
    const [text, setText] = useState(current_note ? current_note.text : '');


    function saveNote(){
        if(current_note) {
            setNotes(notes.map(note => {
                if(note.id == current_note.id) {
                    return {id: note.id, title: title, text: text}
                } else {
                    return note;
                }
            }));
        } else {
            const new_note = {id: new_id.current, title: formData.get("title"), text: formData.get("text")};
            const next_notes = [...notes.slice(), new_note];

            setNotes(next_notes);
            new_id.current = new_id.current + 1;
        }
        setModalState({open: false, edit: null});
    }

    return (
        <div className="modal-container">
            <div className="modal-inner-container">
                <div className="modal-header">
                    <h1 className="modal-title">Add note</h1>
                    <a href="#" className="modal-close" onClick={(e) => {
                        e.preventDefault();
                        setModalState({open: false, edit: null});
                    }}>
                        &times;
                    </a>
                </div>
                <div className="modal-content">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        saveNote();
                    }}>
                        <label htmlFor="title">Title</label>
                        <input id="title" name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <label htmlFor="text">Note text</label>
                        <Editor id="text" value={text} onTextChange={(e) => setText(e.htmlValue)}/>
                        <button type="submit">{current_note ? "Update note" : "Add note"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
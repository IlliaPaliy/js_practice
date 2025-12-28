import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NoteFormModal } from './components/NoteFormModal'

function App() {
  const [notes, setNotes] = useState([{id:0, title: "note title", text: "some text"}]);
  const [modal_state, setModalState] = useState({
    open: false,
    edit: null
  });
  const id_counter = useRef(1);
  const notebook = notes.map(note => <Note key={note.id} note={note} editNote={editNote} deleteNote={deleteNote}></Note>)

  function editNote(id) {
    setModalState({
      open: true,
      edit: id
    })
  }

  function deleteNote(id) {
    setNotes(notes.filter(a => a.id !== id));
  }

  return (
    <>
      {notebook}

      <button onClick={() => 
        setModalState({
          open: true,
          edit: null
        })
        }>Add new note</button>
      {modal_state.open && (<NoteFormModal new_id={id_counter} notes={notes} setNotes={setNotes} modal_state={modal_state} setModalState={setModalState}/>)}
    </>
  )
}

function Note({note, editNote, deleteNote}) {
  return <div className="note-wrapper">
      <h1>{note.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: note.text}}></p>
      <button onClick={() => editNote(note.id)}>Edit</button>
      <button 
        onClick={() => deleteNote(note.id)}>
          Delete
      </button>
    </div>
}

export default App

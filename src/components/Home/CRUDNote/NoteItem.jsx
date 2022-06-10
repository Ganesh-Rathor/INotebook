import React,{useContext} from "react";
import "./NoteItem.css";
import noteContex from "../../context/NoteContex";
// eslint-disable-next-line

function NoteItem(props) {
  const context = useContext(noteContex);
  const {deleteNote} = context;
  const { note, updateNote,alert } = props;

  const deleteNotes = ()=>{
    deleteNote(note._id);
    alert('Note Was Deleted',"danger");
  }
  return (
      <div className="card mx-3 my-3" style={{width: "25rem"}}>
        <div className="card-body">
          <h5 className="card-title">{note.title} <span className="mark mx-1 bg-info text-white fs-6">{note.tag}</span></h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash-can "  onClick={deleteNotes}></i>
          <i className="fa-solid fa-pen-to-square mx-4" onClick={()=>updateNote(note)}></i>
          <h6 className="text-muted my-2">{note.date}</h6>
        </div>
      </div>
  );
}

export default NoteItem;

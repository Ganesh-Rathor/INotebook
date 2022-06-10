import React, { useContext, useEffect, useRef,useState } from "react";
import AddNote from "./CRUDNote/AddNote";
import NoteContex from "../context/NoteContex";
import NoteItem from "./CRUDNote/NoteItem";
import { useNavigate } from "react-router-dom";
// import UpdateNote from "./CRUDNote/UpdateNote";

function Note(props) {
  const {alert} = props; 
  const context = useContext(NoteContex);
  const { notes, getNote,editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const Navigate = useNavigate();
  
  const [note, setNote] = useState({ eId:"", etitle:"",edescription:"",etag:""});

  const OnChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

  const SubmitNote = (e)=>{
    e.preventDefault();
    console.log(note);
    editNote(note.eId,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    alert("Note Updated Successfully","success");
  }

  const updateNote = (CurrNote) => {
    ref.current.click();
    setNote({eId:CurrNote._id, etitle:CurrNote.title,edescription:CurrNote.description,etag:CurrNote.tag});
    
  };

  useEffect(() => {
    if(localStorage.getItem('token')){
    getNote();
    }
    else{
      Navigate('/login')
    }
  });

  // MODAL
  return (
    <>
      <AddNote alert={alert} />
      {/* <UpdateNote ref={Ref} /> */}

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title..
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    value={note.etitle}
                    name="etitle"
                    onChange={OnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Discription...
                  </label>
                  <textarea
                    onChange={OnChange}
                    value={note.edescription}
                    rows={6}
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    tag..
                  </label>
                  <input
                    type="text"
                    value={note.etag}
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={OnChange}
                  />
                </div>
              </form>


            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Cancel
              </button>
              <button type="button" onClick={SubmitNote} 
              disabled={note.etitle.length < 5 || note.edescription.length < 5}
              className="btn btn-primary">
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Notes</h2>
      {notes.length === 0 &&
      <h3 className="mx-4 my-3 text-muted">
        No notes to display Plese add a Note
      </h3>
      }
      <div className="row">
        {notes.map((note, i) => {
          return <NoteItem key={i} alert={alert} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  );
}

export default Note;

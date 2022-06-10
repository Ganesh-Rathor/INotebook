import React,{useState,useContext} from "react";
import NoteContex from "../../context/NoteContex";


function AddNote(props) {
  const {alert} = props;
  const [note, setNote] = useState({title:"",description:"",tag:""});

  const context = useContext(NoteContex);
  const { addNote} = context;


  const OnChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

  const SubmitNote = (e)=>{
    console.log(note.description);
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    alert("Note added Successfully ","success");
    setNote({title:"",description:"",tag:""});
  }
  return (
    <>
      <h1>Create A Note...</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title..
          </label>
          <input type="text" className="form-control" id="title" name="title"
          value={note.title}
          onChange={OnChange} />
          { note.title.length < 5 ?
          
            <p className="mx-3 my-1 text-danger">
              <i className="fa-solid fa-star fa-2xs"></i> Maximum leangth should be 5 words </p> 
            : null
          }
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description...
          </label>
          <textarea
          onChange={OnChange}
            rows={6}
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
          ></textarea>
          { note.description.length < 5 &&
            <p className="mx-3 my-1 text-danger">
              <i className="fa-solid fa-star fa-2xs"></i> Maximum leangth should be 5 words </p> 
            
          }
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            tag..
          </label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={OnChange} />
        </div>

        <button type="submit" 
        disabled={note.title.length < 5 || note.description.length < 5}
        onClick={SubmitNote}
        className="btn btn-primary my-3">
        <i className="fa-solid fa-plus"></i> Add Note
        </button>
      </form>
    </>
  );
}

export default AddNote;

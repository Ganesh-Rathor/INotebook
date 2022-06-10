import React, { useState } from "react";
import NoteContext from "./NoteContex";

const NoteState = (props) => {
  const host = 'http://localhost:80/';
  let url = "";


  // READ a note
  const [notes, setnotes] = useState([]);

  const getNote = async () => {
    url = `user/fetchNotes`;
    const response = await fetch(host + url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setnotes(json)
  }



  // ADD a note
  const addNote = async (title, description, tag) => {

    // API Call

    url = `user/addNote`;
    const response = await fetch(host + url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();


    setnotes(notes.concat(json));
  };



  // DELETE anote
  const deleteNote = async (id) => {

    // API call

    url = `user/deletenote/${id}`;
    const response = await fetch(host + url, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });

    const delNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(delNotes);
  };



  // EDIT a note
  const editNote = async (id, title, description, tag) => {

    // API Call 
    url = `user/updatenote/${id}`;
    const response = await fetch(host + url, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    // const json = response.json();


    //  LOGIC for EditNote

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title;
        notes[index].discription = description;
        notes[index].tag = tag;
      }
      break;
    }

    setnotes(notes);
  };


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

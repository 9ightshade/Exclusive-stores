import React from 'react'
import NoteCard from '../Components/NoteCard'
import { fakeData as notes } from "../assets/fakeData.js";
const NotesPage = () => {
  
  console.log(notes);
  return (
    <div>
      {
        notes.map((note) => {

         return <NoteCard note={note} key={note.$id}/>
        })
      }
    </div>
  )
}

export default NotesPage

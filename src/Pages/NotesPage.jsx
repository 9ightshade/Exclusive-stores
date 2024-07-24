import React, { useEffect, useState } from 'react'
import NoteCard from '../Components/NoteCard'
// import { fakeData as notes } from "../assets/fakeData.js";
import { db } from '../appwrite/databases'
const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    init();
  },[])


  const init = async () => {
    const response = await db.notes.list();
    setNotes(response.documents);
}

  // console.log(notes);
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

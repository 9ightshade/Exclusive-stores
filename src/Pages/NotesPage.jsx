import React from 'react'
import NoteCard from '../Components/NoteCard'

const NotesPage = () => {
  return (
    <div>
      {
        notes.map((note) => {
          <NoteCard note={note} key={note.$id}/>
        })
      }
    </div>
  )
}

export default NotesPage

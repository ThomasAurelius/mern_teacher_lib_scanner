import React from 'react'
import AddBookModal2 from '../components/AddBookModal2'
import AddBookModalSpeechly from '../components/AddBookModalSpeechly'
import AddBookModalScanner from '../components/AddBookModalScanner'
import Books from '../components/Books'
import '../App.css'

export default function Home() {
  return (
   <> 
      <div className="d-flex gap-3 mb-4">
         <AddBookModal2 />  
         <AddBookModalSpeechly /> 
         <AddBookModalScanner />
     
      </div>         
         <Books />
   </>
  )
}

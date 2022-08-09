import React from 'react'
import AddBookModalSpeechly from '../components/AddBookModalSpeechly'
import AddBookModalScanner from '../components/AddBookModalScanner'
import ISBNLookup from '../components/AddBookISBNLookup'
import Books from '../components/Books'
import '../App.css'
import SortBar from '../components/SortBar'

export default function Home() {
  return (
   <> 
      <div className="d-flex gap-3 mb-4 home">
         
         <AddBookModalSpeechly /> 
         <ISBNLookup />
         <AddBookModalScanner />
     
      </div>      
         <SortBar />   
         <Books />
   </>
  )
}

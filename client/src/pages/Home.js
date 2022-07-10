import React from 'react'
import AddBookModal from '../components/AddBookModal'
import Books from '../components/Books'

export default function Home() {
  return (
   <> 
      <div className="d-flex gap-3 mb-4">
         <AddBookModal />   
     
      </div>         
         <Books />
   </>
  )
}

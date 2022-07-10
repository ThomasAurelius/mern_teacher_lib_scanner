import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'

import { ADD_BOOK } from '../mutations/bookMutations'

import { GET_BOOKS } from '../queries/bookQueries'

export default function AddBookModal() {

  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [isbn, setIsbn] = useState('')
  const [copy, setCopy] = useState('')
  const [price, setPrice] = useState('')
  const [img, setImg] = useState('')
  const [subject, setSubject] = useState('')
  const [categories, setCategories] = useState('')
  const [location, setLocation] = useState('')
  const [borrowedBy, setBorrowedBy] = useState('')
  

  const [addBook] = useMutation(ADD_BOOK, {
    variables: { title, authors, isbn, copy, price, img, subject, categories, location, borrowedBy },
    update(cache, { data:  { addBook } }) {
      const { books } = cache.readQuery({ query: GET_BOOKS });

      cache.writeQuery({ 
        query: GET_BOOKS,
        data: { books: books.concat([addBook]) },
      })
    }
  })

  const onSubmit = (e) => {
    e.preventDefault();    
    if (title === "" || authors === "" ) {
      return alert('Please enter title and author')
    }
    addBook(title, authors, isbn, copy, price, img, subject, categories, location, borrowedBy);
    setTitle('');
    setAuthors('');
    setIsbn('');
    setCopy('');
    setPrice('');
    setImg('');
    setSubject('');
    setCategories('');
    setLocation('');
    setBorrowedBy('');
  }

  return (
    <>
      <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addBookModal">               
        <div className="d-flex align-items-center">
          <FaUser className='icon'/>
          <div>Add Book</div>
        </div>
      </button>

      <div className="modal fade" id="addBookModal" tabIndex="-1" aria-labelledby="addBookModalLabel" aria-hidden="true">
      <div className="modal-dialog">
         <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="addBookModalLabel">Add Book</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className='form-control' id="title" value={title} onChange={ (e) => setTitle(e.target.value) } />
                </div>
                <div className="mb-3">
                  <label className="form-label">Authors</label>
                  <input type="text" className='form-control' id="authors" value={authors} onChange={ (e) => setAuthors(e.target.value) } />
                </div>
                <div className="mb-3">
                  <label className="form-label">ISBN</label>
                  <input type="text" className='form-control' id="isbn" value={isbn} onChange={ (e) => setIsbn(e.target.value) } />
                </div>
                <div className="mb-3">
                  <label className="form-label">Copy</label>
                  <input type="text" className='form-control' id="copy" value={copy} onChange={ (e) => setCopy(e.target.value) } />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input type="text" className='form-control' id="price" value={price} onChange={ (e) => setPrice(e.target.value) } />
                </div>
                <div className="mb-3">
                  <label className="form-label">Img</label>
                  <input type="text" className='form-control' id="img" value={img} onChange={ (e) => setImg(e.target.value) } />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input type="text" className='form-control' id="subject" value={subject} onChange={ (e) => setSubject(e.target.value) } />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categories</label>
                  <input type="text" className='form-control' id="categories" value={categories} onChange={ (e) => setCategories(e.target.value) } />
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input type="text" className='form-control' id="location" value={location} onChange={ (e) => setLocation(e.target.value) } />
                </div>
                <div className="mb-3">
                  <label className="form-label">Borrowed By:</label>
                  <input type="text" className='form-control' id="borrowedBy" value={borrowedBy} onChange={ (e) => setBorrowedBy(e.target.value) } />
                </div>
                
                <button className="btn btn-secondary" type="submit" data-bs-dismiss="modal" >Submit</button>
              </form>
            </div>
            
         </div>
      </div>
      </div>
    </>
  )
}

import { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { Button, Modal } from 'react-bootstrap'
import { UPDATE_BOOK } from '../mutations/bookMutations'

import { GET_BOOKS } from '../queries/bookQueries'

export default function UpdateBookModal(book) {
 
  const [show, setShow] = useState(false)
  const [id, setId] = useState('')
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

  const handleClose = () => setShow(false);

  const handleShow = () => { 
    setId((book.book.id) ? book.book.id : "")
    setTitle((book.book.title) ? book.book.title : "")
    setAuthors((book.book.authors) ? book.book.authors : "")
    setIsbn((book.book.isbn) ? book.book.isbn : "")
    setCopy((book.book.copy) ? book.book.copy : "")
    setPrice((book.book.price)  ? book.book.price : "")  
    setImg((book.book.img) ? book.book.img : "")
    setSubject((book.book.subject) ? book.book.subject : "")
    setCategories((book.book.categories) ? book.book.categories : "")
    setLocation((book.book.location) ? book.book.location : "")
    setBorrowedBy((book.book.borrowedBy) ? book.book.borrowedBy : "")
    setShow(true);
  }
  
  const [updateBook] = useMutation(UPDATE_BOOK, {
    variables: { id, title, authors, isbn, copy, price, img, subject, categories, location, borrowedBy },
    refetchQueries: [{ query: GET_BOOKS }]
  })

  const onSubmit = (e) => {
    e.preventDefault();    
    if (title === "" || authors === "" ) {
      return alert('Please enter title and author')
    }
    updateBook(id, title, authors, isbn, copy, price, img, subject, categories, location, borrowedBy);
    clearFields();
  }

  function clearFields() {
    setId('');
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

      <Button variant="primary" className='btn btn-primary' onClick={handleShow}>
        <div className="d-flex align-items-center">
          <FaRegEdit className='icon'/>
       
        </div>
      </Button>

      

     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="modal-header">
              <h5 className="modal-title" id="addBookModalLabel">Update Book</h5>
             
            </div>
          </Modal.Title>
        </Modal.Header>
            
        <Modal.Body>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
              <div className="mb-3">
                  <label className="form-label">ID</label>
                  <input type="text" className='form-control' id="id" value={id} disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className='form-control' id="title" value={title} onChange={ (e) => setTitle(e.target.value) } />
                </div>
                <div className="mb-3">
                  <label className="form-label">Author</label>
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
                
                <Button variant='secondary' className="btn btn-secondary" type='submit' onClick={handleClose}>Update Book</Button>
                <Button variant="primary" className='btn btn-primary btn-clear' onClick={clearFields}>Clear</Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
    </>
  )
}

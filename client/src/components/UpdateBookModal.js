import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { Button, Modal } from 'react-bootstrap'
import { UPDATE_BOOK } from '../mutations/bookMutations'

import { GET_BOOKS } from '../queries/bookQueries'

export default function UpdateBookModal(book) {
 
  const [show, setShow] = useState(false)
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
    //not working.... fields stay blank.
    setTitle(book.title)
    setAuthors(book.authors)
    setIsbn(book.isbn)
    setCopy(book.copy)
    setPrice(book.price)    
    setImg(book.img)
    setSubject(book.subject)
    setCategories(book.categories)
    setLocation(book.location)
    setBorrowedBy(book.borrowedBy)
    console.log(book)
    
    setShow(true);
  }
  

  const [updateBook] = useMutation(UPDATE_BOOK, {
    //not working... 400 error
    variables: { id: book.id, title, authors, isbn, copy, price, img, subject, categories, location, borrowedBy },
    refetchQueries: [{ query: GET_BOOKS, variables: { id: book.id } }]
  })

  const onSubmit = (e) => {
    e.preventDefault();    
    if (title === "" || authors === "" ) {
      return alert('Please enter title and author')
    }
    updateBook(title, authors, isbn, copy, price, img, subject, categories, location, borrowedBy);
    clearFields();
  }

  function clearFields() {
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
          <FaUser className='icon'/>
          <div>Update Book</div>
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

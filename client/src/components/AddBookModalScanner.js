import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { Button, Modal } from 'react-bootstrap'
import Html5QrcodePlugin from './Html5QrcodePlugin'
import BeepAudio from '../beep.mp3'

import { ADD_BOOK } from '../mutations/bookMutations'

import { GET_BOOKS } from '../queries/bookQueries'

export default function AddBookModalScanner() {
  const [decodedResults, setDecodedResults] = useState(9781408810552)
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
  const handleShow = () => setShow(true);
  

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

   function onNewScanResult(decodedText, decodedResult)  {
    var AudioPlay = new Audio (BeepAudio);
    console.log(
      "App [result]", decodedResult);
    setDecodedResults(decodedText)    
    AudioPlay.play(); 
  }
  

  useEffect(() => {
    const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'
    const getBookData = async (decodedResults) => {
    const url = `${API_URL}${decodedResults}`
    const res = await fetch(url)
    const data = await res.json()

    setTitle(data.items[0].volumeInfo.title)
    setIsbn(data.items[0].volumeInfo.industryIdentifiers[1].identifier)
    setAuthors(data.items[0].volumeInfo.authors[0])
    setImg(data.items[0].volumeInfo.imageLinks.smallThumbnail)  
   
  }
  getBookData(decodedResults)
     
    }, [decodedResults])  


    const onSubmit = (e) => {
    e.preventDefault();    
    if (title === "" || authors === "" ) {
      return alert('Please enter title and author')
    }
    console.log(title, authors, img)
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

      <Button variant="primary" className='btn btn-primary' onClick={handleShow}>
        <div className="d-flex align-items-center">
          <FaUser className='icon'/>
          <div>Add Book w/ Scanner</div>
        </div>
      </Button>

      

     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="modal-header">
              <h5 className="modal-title" id="addBookModalLabel">Add Book</h5>
             
            </div>
          </Modal.Title>
        </Modal.Header>
            
        <Modal.Body>
            <div className="modal-body">
            <div className="scanner">
              <section className="App-section">
              <div className="App-section-title"> Scan ISBN barcode </div>
              <br />
              <Html5QrcodePlugin 
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}/>          
              
              
          
        </section>
            </div>
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
                
                <Button variant='secondary' className="btn btn-secondary" type='submit' onClick={handleClose}>Add Book</Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
    </>
  )
}

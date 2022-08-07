import { useState, useEffect } from 'react'
import { BsBookHalf } from 'react-icons/bs'
import { useMutation } from '@apollo/client'
import { Button, Modal } from 'react-bootstrap'
import BeepAudio from '../beep.mp3'


import {
  SpeechProvider, useSpeechContext
} from "@speechly/react-client";

import {
  PushToTalkButton,
  BigTranscript,
  IntroPopup
} from "@speechly/react-ui";

import { ADD_BOOK } from '../mutations/bookMutations'

import { GET_BOOKS } from '../queries/bookQueries'

export default function ISBNLookup() {
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

  function searchIsbn(isbn)  {
    if (!isbn) {
      alert('Please enter an ISBN')
    } else {
    var AudioPlay = new Audio (BeepAudio);
    
      
 
    const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'
    const getBookData = async (isbn) => {
    const url = `${API_URL}${isbn}`
    const res = await fetch(url)
    const data = await res.json()

    setTitle((data.items[0].volumeInfo.title) ? data.items[0].volumeInfo.title : "")
    setIsbn((data.items[0].volumeInfo.industryIdentifiers[1]?.identifier) ? data.items[0].volumeInfo.industryIdentifiers[1].identifier : "")
    setAuthors((data.items[0].volumeInfo.authors[0]) ? data.items[0].volumeInfo.authors[0] : "")
    setImg((data.items[0].volumeInfo.imageLinks?.smallThumbnail) ? data.items[0].volumeInfo.imageLinks.smallThumbnail : "")  
   
    AudioPlay.play(); 
    console.log(data.items[0].volumeInfo.imageLinks?.smallThumbnail)
  }

  getBookData(isbn)     
}
}

  const onSubmit = (e) => {
    e.preventDefault();    
    if (title === "" || authors === "" ) {
      return alert('Please enter title and author')
    }
    addBook(title, authors, isbn, copy, price, img, subject, categories, location, borrowedBy);
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



  function SpeechlyApp() {
    const { segment } = useSpeechContext();
    let newSegment = []
    // This effect is fired whenever there's a new speech segment available
    useEffect(() => {
      
        if (segment?.isFinal) {
          //translate the speech strings to text numbers
          segment.words.forEach(word => {
            if (word.value === 'ONE') {
              newSegment.push(1)
            } else if (word.value === 'TWO') {
              newSegment.push(2)
            } else if (word.value === 'THREE') {
              newSegment.push(3)
            } else if (word.value === 'FOUR') {
              newSegment.push(4)
            } else if (word.value === 'FIVE') {
              newSegment.push(5)
            } else if (word.value === 'SIX') {
              newSegment.push(6)
            } else if (word.value === 'SEVEN') {
              newSegment.push(7)
            } else if (word.value === 'EIGHT') {
              newSegment.push(8)
            } else if (word.value === 'NINE') {
              newSegment.push(9)
            } else if (word.value === 'ZERO') {
              newSegment.push(0)
          } 
        })
          // Store the final app state as basis of next utterance
          setIsbn(newSegment.join(''));
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [segment]);
  return null
  }

  return (
    <>

      <Button variant="primary" className='btn btn-primary' onClick={handleShow}>
        <div className="d-flex align-items-center">
          <BsBookHalf className='icon'/>
          <div>ISBN Lookup</div>
        </div>
        
      </Button>

      
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="modal-header">
              <h5 className="modal-title" id="addBookModalLabel">ISBN Lookup</h5>
             
            </div>
          </Modal.Title>
        </Modal.Header>
            
        <Modal.Body>
            <div className="modal-body">
            <div className="speechly">
            
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
                  <div id='isbn-div'>
                    <SpeechProvider appId="917295fc-b9d0-4e23-9abb-9fc89a81582e">
                      <BigTranscript placement="top" />
                      <PushToTalkButton placement="top" captureKey=" " powerOn="auto" />
                      <IntroPopup />
                      <SpeechlyApp />

                      <input type="text" className='form-control' id="isbn-field" value={isbn} onChange={ (e) => setIsbn(e.target.value) } />
                      <Button id='lookup' variant="primary" className='btn btn-primary' onClick={() => searchIsbn(isbn)}>Lookup</Button>
                    
                    </SpeechProvider>
                  </div>
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
                <Button variant="primary" className='btn btn-primary btn-clear' onClick={clearFields}>Clear</Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
    </>
  )
}


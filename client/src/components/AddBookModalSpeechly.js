import { useState, useEffect } from 'react'
import { BiMicrophone } from 'react-icons/bi'
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

export default function AddBookModalSpeechly() {
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
  const [transcript, setTranscript] = useState([])

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
    var titleIndex = 0
    var authorIndex = 0
    var categoriesIndex = 0
    var locationIndex = 0

    var segmentTitle = []
    var segmentAuthors = []
    var segmentCategories = []
    var segmentLocation = []
      
        if (segment?.isFinal) {
          //translate the speech strings to text numbers
         
          segment.words.forEach(word => {
            newSegment.push(word.value)
            if (word.value === 'ADD') {
              titleIndex = newSegment.indexOf('ADD')+1
            }
            if (word.value === 'AUTHOR') {
              authorIndex = newSegment.indexOf('AUTHOR')+1
            }
            if (word.value === 'LOCATION') {
              locationIndex = newSegment.indexOf('LOCATION')+1
            }
            if (word.value === 'CATEGORIES') {
              categoriesIndex = newSegment.indexOf('CATEGORIES')+1
            }
            
          })
          console.log(newSegment)
          console.log(titleIndex, authorIndex, locationIndex, categoriesIndex)
          





          //Add logic to set state by segment peices



          
          

          
        //title, author, location, categories
          
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [segment]);
  return null
  }

  return (
    <>

      <Button variant="primary" className='btn btn-primary' onClick={handleShow}>
        <div className="d-flex align-items-center">
          <BiMicrophone className='icon'/>
          <div>Add Book w/ Speechly</div>
        </div>
        
      </Button>

      
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="modal-header">
              <h5 className="modal-title" id="addBookModalLabel">Add Book</h5>
                <SpeechProvider appId="917295fc-b9d0-4e23-9abb-9fc89a81582e">
                  <BigTranscript placement="top" />
                  <PushToTalkButton placement="top" captureKey=" " powerOn="auto" />
                  <IntroPopup />
                  <SpeechlyApp />
                </SpeechProvider>
                
            </div>
            <div>
              <p>{transcript}</p>
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
                <Button variant="primary" className='btn btn-primary btn-clear' onClick={clearFields}>Clear</Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
    </>
  )
}



import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_BOOK }  from '../mutations/bookMutations'
import { GET_BOOKS } from '../queries/bookQueries';
import UpdateBookModal from './UpdateBookModal';


export default function BookRow2({ book }) {



const [deleteBook] = useMutation(DELETE_BOOK, {
   variables: { id: book.id },
   refetchQueries: [{ query: GET_BOOKS }],
});



  return (
    <>
    <div className="book-container grid">
      <div className="book-grid1">
        <p >{ book.authors }</p>
        <small className='book-author'>Author</small>
        <p>{ book.title }</p>
        <small className='book-title'>Title</small>
        <div className="book-grid5">
          <button className="btn btn-danger btn-sm" onClick={deleteBook}>
                  <FaTrash />
          </button>
          <UpdateBookModal book={book} />
        </div>
      </div>
      <div className="book-grid2">
        <div><img src={ (book.img) ? book.img : "-" } alt='book cover' /></div>
        <small className='book-img'>Book Cover</small>
      </div>
      <div className="book-grid3">
        <p>{ (book.copy) ? book.copy : "-" }</p>
        <small className='book-copy'>Copy</small>
        <p>{ (book.subject) ? book.subject : "-" }</p>
        <small className='book-subject'>Subject</small>
        <p>{ (book.categories) ? book.categories : "-" }</p>
        <small className='book-categories'>Categories</small>
        
      </div>
      <div className="book-grid4">
        <p>{ (book.location) ? book.location : "-" }</p>
        <small className='book-location'>Location</small>
        <p>{ (book.price) ? book.price : "-" }</p>
        <small className='book-price'>Price</small>
        <p>{ (book.borrowedBy) ? book.borrowedBy : "-" }</p>
        <small className='book-borrowedBy'>Borrowed By</small>
        
      </div>
      
    </div>
     
    
    </>
  )
}


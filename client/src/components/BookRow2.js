
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
        <div>{ book.authors }</div>
        <div>{ book.title }</div>
        <div>{ book.isbn }</div>
      </div>
      <div className="book-grid2">
        <div><img src={ book.img } alt='book cover, img not available' /></div>
      </div>
      <div className="book-grid3">
        <div>{ book.copy }</div>
        <div>{ book.subject }</div>
        <div>{ book.categories }</div>
        
      </div>
      <div className="book-grid4">
        <div>{ book.location }</div>
        <div>{ book.price }</div>
        <div>{ book.borrowedBy }</div>
      </div>
      <div className="book-grid5">
        <button className="btn btn-danger btn-sm" onClick={deleteBook}>
                <FaTrash />
        </button>
        <UpdateBookModal book={book} />
      </div>
    </div>
     
    
    </>
  )
}


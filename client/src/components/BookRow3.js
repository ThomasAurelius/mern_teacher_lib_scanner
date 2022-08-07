
import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_BOOK }  from '../mutations/bookMutations'
import { GET_BOOKS } from '../queries/bookQueries';
import UpdateBookModal from './UpdateBookModal';


export default function BookRow3({ book }) {



const [deleteBook] = useMutation(DELETE_BOOK, {
   variables: { id: book.id },
   refetchQueries: [{ query: GET_BOOKS }],
});



  return (
    <>

    <tr>
      <td className='book-section-1'>
        <div className='book-author'>{ book.authors }</div>
        <div className='book-title'>{ book.title }</div>
        <div>{ book.categories } </div>
      </td>
      <td className='book-section-2'>  
        <div className='book-item'>{ book.copy }</div>
        <div className='book-item'>{ book.subject }</div>
        <div className='book-item'>{ book.price }</div>
      </td>

      <td className='book-section-3'>
        <div className='book-item'>{ (book.location) ? book.location : "-" }</div>
        <div className='book-item'>{ (book.borrowedBy) ? book.borrowedBy : "-"}</div>
        <div className='book-item'>
          <button className="btn btn-danger btn-sm" onClick={deleteBook}>
                  <FaTrash />
          </button>
          <UpdateBookModal book={book} />
        </div>      
      </td>
    
    </tr>
   
     
    
    </>
  )
}


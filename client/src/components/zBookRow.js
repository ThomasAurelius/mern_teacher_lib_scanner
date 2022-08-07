import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_BOOK }  from '../mutations/bookMutations'
import { GET_BOOKS } from '../queries/bookQueries';


export default function BookRow({ book }) {

const [deleteBook] = useMutation(DELETE_BOOK, {
   variables: { id: book.id },
   refetchQueries: [{ query: GET_BOOKS }],
});

  return (
    <>
    <div className="bigRow">
      <tr>
      
        <td>{ book.authors }</td>
      
        <td>{ book.copy }</td>
        
        <td className='table-img'><img src={ book.img } /></td>
        
        <td>{ book.categories }</td>
        
        
      
        <td>
           <button className="btn btn-danger btn-sm" onClick={deleteBook}>
              <FaTrash />
           </button>
        </td>
      </tr>
      <tr>
        <td>{ book.title }</td>
        <td>{ book.subject }</td>
        <td>{ book.location }</td>
      </tr>
      <tr>
        <td>{ book.isbn }</td>
        <td>{ book.price }</td>
        <td>{ book.borrowedBy }</td>
      </tr>
    </div>
    </>
  )
}


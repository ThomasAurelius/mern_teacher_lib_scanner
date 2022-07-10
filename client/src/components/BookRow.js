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
    <tr>
      <td>{ book.title }</td>
      <td>{ book.authors }</td>
      <td>{ book.isbn }</td>
      <td>{ book.copy }</td>
      <td>{ book.price }</td>
      <td>{ book.img }</td>
      <td>{ book.subject }</td>
      <td>{ book.categories }</td>
      <td>{ book.location }</td>
      <td>{ book.borrowedBy }</td>
      
      <td>
         <button className="btn btn-danger btn-sm" onClick={deleteBook}>
            <FaTrash />
         </button>
      </td>
    </tr>
  )
}


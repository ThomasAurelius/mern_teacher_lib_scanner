import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import DELETE_BOOK  from '../mutations/bookMutations'
import { GET_BOOKS } from '../queries/bookQueries';


export default function BookRow({ book }) {

const [deleteBook] = useMutation(DELETE_BOOK, {
   variables: { id: book.id },
   refetchQueries: [{ query: GET_BOOKS }],
});

  return (
    <tr>
      <td>{ book.name }</td>
      <td>{ book.email }</td>
      <td>{ book.phone }</td>
      <td>
         <button className="btn btn-danger btn-sm" onClick={deleteBook}>
            <FaTrash />
         </button>
      </td>
    </tr>
  )
}


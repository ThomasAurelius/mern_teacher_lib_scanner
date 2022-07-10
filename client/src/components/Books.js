import { useQuery } from '@apollo/client'
import BookRow from './BookRow'
import { GET_BOOKS } from '../queries/bookQueries'
import Spinner from './Spinner.js'



export default function Books() {
   const { loading, error, data } = useQuery(GET_BOOKS)

   if (loading) return <Spinner />
   if (error) return <p>Something went wrong</p>

  return (
    <>
      { !loading && !error && (
         <table className='table table-hover mt-3'>
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Authors</th>
                  <th>ISBN</th>
                  <th>Copy</th>
                  <th>Price</th>
                  <th>IMG</th>
                  <th>Subject</th>
                  <th>Categories</th>
                  <th>Location</th>
                  <th>BorrowedBy</th>
                  <th></th>              
               </tr>            
            </thead>
            <tbody>
               {data.books.map(book => (
                  <BookRow key={book.id} book={book} />
               ))}
            </tbody>
         </table>
      ) }
    </>
  );
}

import { useQuery } from '@apollo/client'
import BookRow2 from './BookRow2'
import { GET_BOOKS } from '../queries/bookQueries'
import Spinner from './Spinner.js'



export default function Books() {
   const { loading, error, data } = useQuery(GET_BOOKS)

   if (loading) return <Spinner />
   if (error) return <p>Something went wrong</p>

  return (
    <>
      { !loading && !error && (
         <div className='table table-hover mt-3'>
            <div>
               {data.books.map(book => (
                  <BookRow2 key={book.id} book={book} />
               ))}
            </div>
         </div>
      ) }
    </>
  );
}

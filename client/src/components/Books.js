import { useQuery } from '@apollo/client'
import BookRow3 from './BookRow3'
import { GET_BOOKS } from '../queries/bookQueries'
import Spinner from './Spinner.js'
import { Button } from 'react-bootstrap'



export default function Books() {
   const { loading, error, data } = useQuery(GET_BOOKS)

   let sortData = data
   console.log(sortData)
   const sortByAuthor = (sortData) => {
    
     sortData.books.sort((a,b) => a.authors - b.authors); 
      
   }

   if (loading) return <Spinner />
   if (error) return <p>Something went wrong - error: {error}</p>

  return (
    <>
      <div>
         <Button onClick={sortByAuthor}>Sort by Author</Button>
      </div>
      { !loading && !error && (
         <div className='table table-hover mt-3'>
            <div>
               {data.books.map(book => (
                  <BookRow3 key={book.id} book={book} />
               ))}
            </div>
         </div>
      ) }
    </>
  );
}



export default function BookInfo({ book }) {
  return (
    <>      
      <h5 className="mt-5">Book Information</h5>
      <ul className="list-group">
         <li className="list-group-item">
            {book.name}
         </li>
         <li className="list-group-item">
            {book.email}
         </li>
         <li className="list-group-item">
            {book.phone}
         </li>

      </ul>
    </>
  )
}

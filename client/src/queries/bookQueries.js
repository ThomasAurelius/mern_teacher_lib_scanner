import { gql } from '@apollo/client'

const GET_BOOKS = gql`
   query getBooks {
      books {
         id
         title
         authors
         isbn
         copy
         price
         img
         subject
         categories
         location
         borrowedBy
      }
   }
`;

export { GET_BOOKS }
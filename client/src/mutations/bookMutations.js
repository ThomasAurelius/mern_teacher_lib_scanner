import { gql } from '@apollo/client';

const ADD_BOOK = gql`
   mutation addBook($title: String!, $authors: String!, $isbn: String!, $copy: String!, $price: String!, $img: String!, $subject: String!, $categories: String!, $location: String!, $borrowedBy: String!) {
      addBook(title: $title, authors: $authors, isbn: $isbn, copy: $copy, price: $price, img: $img, subject: $subject, categories: $categories, location: $location, borrowedBy: $borrowedBy) {
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
`

const DELETE_BOOK = gql`
   mutation deleteBook($id: ID!) {
      deleteBook(id: $id) {
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
`

const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: String!
    $title: String!
    $authors: String!
    $isbn: String!
    $copy: String!
    $price: String!
    $img: String!
    $subject: String!
    $categories: String!
    $location: String!
    $borrowedBy: String!
     
  ) {
    updateBook(
      id: $id
      title: $title
      authors: $authors
      isbn: $isbn
      copy: $copy
      price: $price
      img: $img
      subject: $subject
      categories: $categories
      location: $location
      borrowedBy: $borrowedBy
           
    ) {
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

export {ADD_BOOK, DELETE_BOOK, UPDATE_BOOK};
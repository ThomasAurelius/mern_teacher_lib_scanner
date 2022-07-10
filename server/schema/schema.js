
const Book = require('../models/Book');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');



// Book Type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    authors: { type: GraphQLString },
    isbn: { type: GraphQLString },
    copy: { type: GraphQLString },
    price: { type: GraphQLString },
    img: { type: GraphQLString },
    subject: { type: GraphQLString },
    categories: { type: GraphQLString },
    location: { type: GraphQLString },
    borrowedBy: { type: GraphQLString },
   
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
 
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find();
      },
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a book
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        authors: { type: GraphQLNonNull(GraphQLString) },
        isbn: { type: GraphQLString },
        copy: { type: GraphQLString },
        price: { type: GraphQLString },
        img: { type: GraphQLString },
        subject: { type: GraphQLString },
        categories: { type: GraphQLString },
        location: { type: GraphQLString },
        borrowedBy: { type: GraphQLString },
      },
      resolve(parent, args) {
        const book = new Book({
          title: args.title,
          authors: args.authors,
          isbn: args.isbn,
          copy: args.copy,
          price: args.price,
          img: args.img,
          subject: args.subject,
          categories: args.categories,
          location: args.location,
          borrowedBy: args.borrowedBy,
        });

        return book.save();
      },
    },
    // Delete a book
    deleteBook: {
      type: BookType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
   

        return Book.findByIdAndRemove(args.id);
      },
    },
   
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
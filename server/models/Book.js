const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
   title: {
      type: String,
   },
   authors: {
      type: String,
   },
   isbn: {
      type: String,
   },
   copy: {
      type: String,
   },
   price: {
      type: String,
   },
   img: {
      type: String,
   },
   subject: {
      type: String,
   },
   categories: {
      type: String,
   },
   location: {
      type: String,
   },
   borrowedBy: {
      type: String,
   },
})

module.exports = mongoose.model('Book', BookSchema)
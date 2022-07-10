const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
   title: {
      type: String,
   },
   authors: {
      type: Array,
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
      type: Array,
   },
   location: {
      type: String,
   },
   borrowedBy: {
      type: String,
   },
})

module.exports = mongoose.model('Book', BookSchema)
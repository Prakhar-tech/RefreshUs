const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
 movieName: String,
 genre: String,
 createdAt: {
    type: Date,
    default: Date.now,
  },
  link:String,
  duration:String,
  description:String,
  coverImage:String,
  rating:String,
  year: String,
  type: String,
  trailer: String
})

module.exports = mongoose.model('Movie',movieSchema);
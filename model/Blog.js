const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  created_At: {
    type: Date,
    default: Date.now()
  }
});

const Blog = mongoose.model('blog', BlogSchema)
module.exports = Blog;
const {gql} = require('apollo-server-express');

//queries
const typeDefs =gql`
  type Blog{
    id: ID
    title: String
    description: String
  }

  type Query {
    hello: String
    getAll: [Blog]
  }

  input BlogInput{
    title: String
    description: String
  }
  
  type Mutation {
    createBlog(blog: BlogInput): Blog
    updateBlog(id:String, blog: BlogInput): Blog
    deleteBlog(id:String): String
  }
`;

module.exports = typeDefs;
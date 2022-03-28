const {gql} = require('apollo-server-express');

//queries
const typeDefs =gql`
  type Blog{
    id: ID
    title: String
    description: String
  }

  type User{
    id:ID,
    username: String
    email: String
    error: String
    success: Boolean
    token: String
  }

  type Query {
    hello: String
    getAll: [Blog]
    getAllUser: [User]
  }

  input BlogInput{
    title: String
    description: String
  }

  input UserInput{
    username: String
    email: String
    password: String
  }
  
  input LoginUserInput{
    email: String
    password: String
  }

  type Mutation {
    createBlog(blog: BlogInput): Blog
    updateBlog(id:String, blog: BlogInput): Blog
    deleteBlog(id:String): String
    createUser(user: UserInput): User
    loginUser(user: LoginUserInput): User
  }
  
`;

module.exports = typeDefs;
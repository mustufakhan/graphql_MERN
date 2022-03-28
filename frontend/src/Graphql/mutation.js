import { gql } from '@apollo/client';

export const CREATE_BLOG = gql`
mutation createBlog($title: String, $description: String){
  createBlog(blog: {title: $title, description: $description}){
    id
    title
    description
  }
}`;

export const DELETE_BLOG = gql`
mutation deleteBlog($id: String){
  deleteBlog(id: $id)
}`;


export const UPDATE_BLOG = gql`
mutation updateBlog($id: String, $title: String, $description: String){
  updateBlog(id: $id, blog: {title: $title, description: $description}){
    id
    title
    description
  }
}`;

export const CREATE_USER = gql`
mutation createUser($username: String, $email:String, $password: String){
  createUser(user:{username: $username, email:$email, password: $password}){
    error
    success
  }
}`;

export const LOGIN_USER = gql`
mutation loginUser($email:String, $password: String){
  loginUser(user:{email:$email, password: $password}){
    id
    username
    email
    token
    error
    success
  }
}`;

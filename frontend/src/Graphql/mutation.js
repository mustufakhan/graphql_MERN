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

import { gql } from '@apollo/client';

export const getAll = gql`
{
  getAll{
    id
    title
    description
  }
}`
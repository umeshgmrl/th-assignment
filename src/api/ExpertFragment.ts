import { gql } from "@apollo/client";
import { ImageFragment } from "./ImageFragment";

export const ExpertFragment = gql`
  ${ImageFragment}
  fragment Expert on Expert {
    id
    slug
    title
    firstName
    lastName
    company
    image {
      ...Image
      __typename
    }
    userId
    updatedAt
    __typename
  }
`;

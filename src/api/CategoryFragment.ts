import { gql } from "@apollo/client";
import { ImageFragment } from "./ImageFragment";

export const CategoryFragment = gql`
  ${ImageFragment}
  fragment Category on Category {
    id
    name
    slug
    image {
      ...Image
      __typename
    }
    __typename
  }
`;

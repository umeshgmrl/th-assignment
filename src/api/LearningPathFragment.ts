import { gql } from "@apollo/client";
import { ImageFragment } from "./ImageFragment";
import { CategoryFragment } from "./CategoryFragment";

export const LearningPathFragment = gql`
  ${ImageFragment}
  ${CategoryFragment}
  fragment LearningPath on LearningPath {
    id
    name
    slug
    preamble
    sortOrder
    image {
      ...Image
      __typename
    }
    categories {
      ...Category
      __typename
    }
    __typename
  }
`;

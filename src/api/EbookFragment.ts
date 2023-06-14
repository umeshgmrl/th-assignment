import { gql } from "@apollo/client";
import { ImageFragment } from "./ImageFragment";
import { CategoryFragment } from "./CategoryFragment";
import { ExpertFragment } from "./ExpertFragment";

export const EbookFragment = gql`
  ${ImageFragment}
  ${CategoryFragment}
  ${ExpertFragment}
  fragment Ebook on Ebook {
    __typename
    id
    name
    slug
    readingTime
    categories {
      ...Category
      __typename
    }
    image {
      ...Image
      __typename
    }
    experts {
      ...Expert
      __typename
    }
  }
`;

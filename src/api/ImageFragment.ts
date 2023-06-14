import { gql } from "@apollo/client";

export const ImageFragment = gql`
  fragment Image on Image {
    id
    uri
    blurHash
    width
    height
    alt
    __typename
  }
`;

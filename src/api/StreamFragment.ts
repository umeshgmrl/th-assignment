import { gql } from "@apollo/client";
import { ImageFragment } from "./ImageFragment";
import { CategoryFragment } from "./CategoryFragment";
import { ExpertFragment } from "./ExpertFragment";

export const StreamFragment = gql`
  ${ImageFragment}
  ${CategoryFragment}
  ${ExpertFragment}
  fragment Stream on Stream {
    __typename
    id
    status
    slug
    name
    preamble
    length
    videoUrl
    wentLiveAt
    createdAt
    updatedAt
    publishedAt
    image {
      ...Image
      __typename
    }
    categories {
      ...Category
      __typename
    }
    channel
    experts {
      ...Expert
      __typename
    }
    hosts {
      expert {
        ...Expert
        __typename
      }
      uid
      accepted
      order
      __typename
    }
    upvoteCount
    downvoteCount
  }
`;

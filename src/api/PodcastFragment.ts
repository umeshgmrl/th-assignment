import { gql } from "@apollo/client";
import { ImageFragment } from "./ImageFragment";
import { CategoryFragment } from "./CategoryFragment";
import { ExpertFragment } from "./ExpertFragment";

export const PodcastFragment = gql`
  ${ImageFragment}
  ${CategoryFragment}
  ${ExpertFragment}
  fragment Podcast on Podcast {
    __typename
    id
    name
    timeSpentOnByUsers
    slug
    length
    image {
      ...Image
      __typename
    }
    categories {
      ...Category
      __typename
    }
    experts {
      ...Expert
      __typename
    }
  }
`;

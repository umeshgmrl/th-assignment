import { gql } from "@apollo/client";
import { ImageFragment } from "./ImageFragment";
import { CategoryFragment } from "./CategoryFragment";
import { ExpertFragment } from "./ExpertFragment";

export const EventFragment = gql`
  ${ImageFragment}
  ${CategoryFragment}
  ${ExpertFragment}
  fragment Event on Event {
    __typename
    id
    name
    slug
    eventType
    startsAt
    endsAt
    image {
      ...Image
      __typename
    }
    experts {
      ...Expert
      __typename
    }
    categories {
      ...Category
      __typename
    }
    locationDisplayName
    publishedAt
    updatedAt
  }
`;

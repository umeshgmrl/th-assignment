import { gql } from "@apollo/client";
import { PodcastFragment } from "./PodcastFragment";
import { EbookFragment } from "./EbookFragment";
import { EventFragment } from "./EventFragment";
import { StreamFragment } from "./StreamFragment";
import { ExpertFragment } from "./ExpertFragment";
import { LearningPathFragment } from "./LearningPathFragment";

export const contentCardsSchema = gql`
  ${PodcastFragment}
  ${EbookFragment}
  ${EventFragment}
  ${StreamFragment}
  ${ExpertFragment}
  ${LearningPathFragment}

  query GetContentCards($keyword: String!) {
    contentCards(filter: { limit: 24, keywords: $keyword }) {
      edges {
        ... on Podcast {
          ...Podcast
          __typename
        }
        ... on Ebook {
          ...Ebook
          __typename
        }
        ... on Event {
          ...Event
          __typename
        }
        ... on Stream {
          ...Stream
          __typename
        }
        ... on Expert {
          ...Expert
          __typename
        }
        ... on LearningPath {
          ...LearningPath
          __typename
        }
        __typename
      }
      meta {
        recommendationId
        total
        offset
        limit
        __typename
      }
      __typename
    }
  }
`;

export default contentCardsSchema;

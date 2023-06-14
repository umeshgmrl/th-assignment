import { gql } from "@apollo/client";

const contentCardsSchema: any = gql`
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

  fragment Podcast on Podcast {
    __typename
    id
    name
    timeSpentOnByUsers
    slug
    length
    image {
      id
      uri
      alt
      blurHash
      __typename
    }
    categories {
      id
      name
      slug
      __typename
    }
    experts {
      id
      slug
      title
      firstName
      lastName
      company
      __typename
    }
  }

  fragment Ebook on Ebook {
    __typename
    id
    name
    slug
    readingTime
    categories {
      id
      name
      slug
      __typename
    }
    image {
      id
      uri
      alt
      blurHash
      __typename
    }
    experts {
      id
      slug
      title
      firstName
      lastName
      company
      __typename
    }
  }

  fragment Event on Event {
    __typename
    id
    name
    slug
    eventType
    startsAt
    endsAt
    image {
      id
      uri
      alt
      blurHash
      __typename
    }
    experts {
      id
      slug
      title
      firstName
      lastName
      company
      __typename
    }
    categories {
      id
      name
      slug
      __typename
    }
    locationDisplayName
    publishedAt
    updatedAt
  }

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
      __typename
    }
    hosts {
      expert {
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
        __typename
      }
      uid
      accepted
      order
      __typename
    }
    experts {
      ...Expert
      __typename
    }
    hosts {
      expert {
        ...Expert
        __typename
      }
      userId
      uid
      accepted
      order
      isFeatured
      __typename
    }
    upvoteCount
    downvoteCount
  }

  fragment Image on Image {
    id
    uri
    blurHash
    width
    height
    alt
    __typename
  }

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

export default contentCardsSchema;

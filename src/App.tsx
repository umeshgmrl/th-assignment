import { useState, useEffect } from "react";
import {
  InputGroup,
  Input,
  InputLeftElement,
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useQuery, gql } from "@apollo/client";
import "./App.css";

const CONTENT_CARDS = gql`
  query ContentCards($keyword: String!) {
    contentCards(filter: { limit: 20, keywords: $keyword, types: [PODCAST] }) {
      edges {
        ... on Podcast {
          name
          image {
            ...Image
          }
          categories {
            ...Category
          }
          experts {
            ...Expert
          }
        }
      }
    }
  }
  fragment Image on Image {
    uri
  }
  fragment Category on Category {
    name
  }
  fragment Expert on Expert {
    firstName
    lastName
    title
    company
  }
`;

const CONTENT_CARDS_2: any = gql`
  query GetContentCards(
    $filter: ContentCardsFilter
    $sorting: ContentCardsSorting
  ) {
    contentCards(filter: $filter, sorting: $sorting) {
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

function App() {
  const [keyword, setKeyword] = useState("");
  const { loading, error, data } = useQuery(CONTENT_CARDS_2, {
    variables: { keyword },
  });

  const handleSearch = (value: string) => {
    setKeyword(value);
  };

  useEffect(() => {
    handleSearch(keyword);
  }, [keyword]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log({ data });

  return (
    <div className="app">
      <h1>Tigerhall Content</h1>
      <InputGroup size="lg" justifyContent="center">
        <InputLeftElement pointerEvents="none">
          <Search2Icon />
        </InputLeftElement>
        <Input type="text" placeholder="Search" />
      </InputGroup>
      {data.contentCards.edges.map((item, i) => {
        const urlParts = item.image.uri.split("/");
        urlParts.splice(3, 0, "resize", "250x");
        const imageUrl = urlParts.join("/");

        const category = item.categories[0];
        const authorFullName = item.experts?.[0]
          ? `${item.experts?.[0].firstName} ${item.experts?.[0].lastName}`
          : "";

        const company = item.experts?.[0].company;

        return (
          <div key={i}>
            <h2>{category.name.toUpperCase()}</h2>
            <h2>{item.name}</h2>
            <img src={imageUrl} alt={item.name} />
            {authorFullName && <span>Author: {authorFullName}</span>}
            {company && <span>Company: {company}</span>}
          </div>
        );
      })}
      {/* <Card maxW="sm">
        <CardBody>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Living room Sofa</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card> */}
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import {
  InputGroup,
  Input,
  InputLeftElement,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  InputRightElement,
  Button,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useQuery, gql } from "@apollo/client";
import { ReactComponent as LearningPath } from "./icons/LearningPath.svg";
import { ReactComponent as Share } from "./icons/Share.svg";
import { ReactComponent as Bookmark } from "./icons/Bookmark.svg";
import "./App.css";

const CONTENT_CARDS_2: any = gql`
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

function App() {
  const [cards, setCards] = useState([]);
  const [keyword, setKeyword] = useState("Cybersecurity");
  const { loading, error, data } = useQuery(CONTENT_CARDS_2, {
    variables: { keyword },
    onCompleted: (data) => {
      setCards(data.contentCards.edges);
    },
  });

  const handleSearch = (value: string) => {
    setKeyword(value);
  };

  const handleChange = (e: any) => {
    handleSearch(e.target.value);
  };

  useEffect(() => {
    handleSearch(keyword);
  }, [keyword]);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="app">
      <Stack spacing={4}>
        <InputGroup>
          <InputLeftAddon children="+234" />
          <Input type="tel" placeholder="phone number" />
        </InputGroup>

        {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
        <InputGroup size="sm">
          <InputLeftAddon children="https://" />
          <Input placeholder="mysite" />
          <InputRightAddon children=".com" />
        </InputGroup>
      </Stack>
      <InputGroup size="lg">
        <Input pr="4.5rem" type="text" placeholder="Enter password" />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm">
            Hide
          </Button>
        </InputRightElement>
      </InputGroup>
      <h1>Tigerhall Content</h1>
      <InputGroup display="flex" marginBottom={30}>
        <InputLeftElement pointerEvents="none" top="12px" left="12px">
          <Search2Icon />
        </InputLeftElement>
        <Input
          height="40px"
          width="full"
          borderRadius={8}
          type="text"
          size="lg"
          fontSize={16}
          padding={5}
          paddingLeft="36px"
          backgroundColor={"grey.700"}
          onChange={handleChange}
        />
      </InputGroup>
      {cards.map((item, i) => {
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
            <Card maxW="sm" marginBottom="10" borderRadius={8}>
              <CardBody>
                <Image
                  width="100%"
                  height="200px"
                  src={imageUrl}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack spacing="1" padding="4">
                  <Text fontSize="md" color="grey.700" lineHeight="shorter">
                    {category.name.toUpperCase()}
                  </Text>
                  <Heading size="md" color="black" lineHeight="short">
                    {item.name}
                  </Heading>
                  <Text fontSize="medium" color="grey.800">
                    {authorFullName}
                  </Text>
                  <Text fontSize="medium" fontWeight="bold" color="grey.700">
                    {company}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter display="flex" justifyContent="flex-end" padding="4">
                <Share />
                <Bookmark />
              </CardFooter>
            </Card>

            {/* <h2>{category.name.toUpperCase()}</h2>
            <h2>{item.name}</h2>
            <div
              style={{
                maxWidth: "25px",
              }}
            >
              <LearningPath />
            </div>
            <img src={imageUrl} alt={item.name} />
            {authorFullName && <span>Author: {authorFullName}</span>}
            {company && <span>Company: {company}</span>} */}
          </div>
        );
      })}
    </div>
  );
}

export default App;

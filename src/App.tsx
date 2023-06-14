import { useState, useEffect, ChangeEvent } from "react";
import {
  Container,
  InputGroup,
  Input,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Box,
  Button,
  Spinner,
  Tag,
  TagLabel,
  Flex,
  Grid,
  useBreakpointValue,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useQuery } from "@apollo/client";
import { ReactComponent as Clock } from "./icons/Clock.svg";
import { ReactComponent as Share } from "./icons/Share.svg";
import { ReactComponent as Bookmark } from "./icons/Bookmark.svg";
import { secondsToHoursAndMinutes } from "./utils";
import Icon from "./components/Icon";
import contentCardsSchema from "./api/contentCardsSchema";
import { GetContentCardsResponse, ContentCardEdge } from "./types/schemaTypes";
import "./App.css";

let debounceTimer: number;

function App() {
  const [cards, setCards] = useState<ContentCardEdge[]>([]);
  const [keyword, setKeyword] = useState("Cybersecurity");
  const { loading, error } = useQuery(contentCardsSchema, {
    variables: { keyword },
    onCompleted: (data: GetContentCardsResponse) => {
      console.log({ data });
      setCards(data.contentCards.edges);
    },
  });

  const handleSearch = (value: string) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => setKeyword(value), 300);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  useEffect(() => {
    handleSearch(keyword);
  }, [keyword]);

  if (error) return <p>Error :(</p>;

  const columnCount = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <Container className="app" padding="0px 15px" maxWidth="1200px">
      <h1>Tigerhall Content</h1>
      <InputGroup
        display="flex"
        marginTop="30px"
        marginBottom="30px"
        backgroundColor={"grey.700"}
        justifyContent="space-between"
        alignItems="center"
        maxWidth="500px"
        mb="40px"
      >
        <Search2Icon zIndex="1" marginLeft="15px" />
        <Input
          border="1px solid #797670"
          position="absolute"
          height="40px"
          width="full"
          borderRadius={8}
          type="text"
          size="lg"
          fontSize={16}
          padding={5}
          paddingLeft="45px"
          onChange={handleChange}
          backgroundColor={"grey.900"}
        />
        {loading && (
          <Spinner
            width={25}
            height={25}
            marginRight="15px"
            position="absolute"
            right="0"
          />
        )}
      </InputGroup>
      <Grid
        templateColumns={`repeat(${columnCount}, 1fr)`}
        gap={4}
        width="full"
      >
        {!cards.length &&
          Array(9)
            .fill(0)
            .map((_, i) => (
              <Box
                borderRadius={8}
                padding="6"
                boxShadow="lg"
                bg="white"
                width="full"
                minHeight="474px"
              >
                <SkeletonCircle size="10" />
                <SkeletonText
                  noOfLines={10}
                  spacing="5"
                  skeletonHeight="4"
                  startColor="white"
                  endColor="grey.400"
                />
              </Box>
            ))}

        {cards.map((item: ContentCardEdge, i) => {
          const urlParts = item.image.uri.split("/");
          urlParts.splice(3, 0, "resize", "250x");
          const imageUrl = urlParts.join("/");

          let category = "";
          let authorFullName = "";
          let company = "";
          let length = "";
          let name = "";

          if ("name" in item) {
            name = item.name;
          }

          if ("categories" in item) {
            category = item.categories[0].name;
          }

          if ("experts" in item && item.experts.length > 0) {
            authorFullName = `${item.experts[0].firstName} ${item.experts[0].lastName}`;
            company = item.experts[0].company;
          }

          if ("length" in item) {
            length = secondsToHoursAndMinutes(item.length);
          } else if ("readingTime" in item) {
            length = String(item.readingTime) + "m";
          }

          return (
            <Box
              as="article"
              key={i}
              width="full"
              display="flex"
              flexDirection="column"
            >
              <Card maxW="sm" marginBottom="10" borderRadius={8}>
                <CardBody>
                  <Flex position="relative">
                    <Image
                      width="100%"
                      height="200px"
                      src={imageUrl}
                      alt="Green double couch with wooden legs"
                      borderRadius="lg"
                    />
                    <Icon
                      type={item.__typename}
                      style={{
                        position: "absolute",
                        height: "30px",
                        width: "30px",
                      }}
                    />
                    {length && (
                      <Tag
                        position="absolute"
                        bottom="10px"
                        right="10px"
                        borderRadius="full"
                        variant="solid"
                        backgroundColor="grey.900"
                        opacity="0.85"
                        padding="5px 10px"
                      >
                        <TagLabel display="flex" alignItems="center">
                          <Clock height="15px" width="15px" /> &nbsp;&nbsp;
                          <Text fontWeight="bold">{length}</Text>
                        </TagLabel>
                      </Tag>
                    )}
                  </Flex>

                  <Stack spacing="1" padding="4" paddingBottom="0px">
                    <Text fontSize="md" color="grey.700" lineHeight="shorter">
                      {category.toUpperCase()}
                    </Text>
                    <Heading size="md" color="black" lineHeight="short">
                      {name}
                    </Heading>
                    <Text fontSize="medium" color="grey.800">
                      {authorFullName}
                    </Text>
                    <Text fontSize="medium" fontWeight="bold" color="grey.700">
                      {company}
                    </Text>
                  </Stack>
                </CardBody>
                <CardFooter
                  display="flex"
                  justifyContent="flex-end"
                  padding="4"
                >
                  <Button backgroundColor="white">
                    <Share />
                  </Button>
                  <Button backgroundColor="white">
                    <Bookmark />
                  </Button>
                </CardFooter>
              </Card>
            </Box>
          );
        })}
      </Grid>
    </Container>
  );
}

export default App;

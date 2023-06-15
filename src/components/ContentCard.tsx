import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
  Button,
} from "@chakra-ui/react";
import { ContentCardEdge } from "./types/schemaTypes";
import { ReactComponent as Clock } from "../icons/Clock.svg";
import { ReactComponent as Share } from "../icons/Share.svg";
import { ReactComponent as Bookmark } from "../icons/Bookmark.svg";
import { ReactComponent as PieChart } from "../icons/PieChart.svg";
import Icon from "../components/Icon";
import { secondsToHoursAndMinutes, getRandomValue } from "../utils";

type Props = {
  item: ContentCardEdge;
};

export default function ContentCard({ item }: Props) {
  // Prepare image URL
  const urlParts = item.image.uri.split("/");
  urlParts.splice(3, 0, "resize", "250x");
  const imageUrl = urlParts.join("/");

  let category = "";
  let authorFullName = "";
  let company = "";
  let length = "";
  let name = "";
  let percentageCompleted = 0;

  if (item.__typename === "Podcast") {
    percentageCompleted = getRandomValue();
  }

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
      width="full"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Card
        maxW="sm"
        marginBottom="20px"
        borderRadius={8}
        overflow="hidden"
        height="100%"
        justifyContent="space-between"
      >
        <CardBody>
          <Flex position="relative">
            <Image
              width="100%"
              height="200px"
              src={imageUrl}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            {percentageCompleted > 0 && (
              <Tag
                position="absolute"
                top="0px"
                left="0px"
                variant="solid"
                backgroundColor="white"
                padding="5px 10px"
                color="grey.900"
              >
                <TagLabel display="flex" alignItems="center">
                  <PieChart height="15px" width="15px" /> &nbsp;&nbsp;
                  <Text fontWeight="bold">
                    {percentageCompleted}% Completed
                  </Text>
                </TagLabel>
              </Tag>
            )}
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
        <CardFooter display="flex" justifyContent="flex-end" padding="4">
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
}

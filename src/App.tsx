import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Container, Grid, useBreakpointValue, Text } from "@chakra-ui/react";
import ContentCardFragment from "./api/ContentCardFragment";
import { GetContentCardsResponse, ContentCardEdge } from "./types/schemaTypes";
import SearchBar from "./components/SearchBar";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ContentCard from "./components/ContentCard";
import "./App.css";

let debounceTimer: ReturnType<typeof setTimeout>;

function App() {
  const [cards, setCards] = useState<ContentCardEdge[]>([]);
  const [keyword, setKeyword] = useState("Cybersecurity");
  const { loading, error } = useQuery(ContentCardFragment, {
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

  useEffect(() => {
    handleSearch(keyword);
  }, [keyword]);

  if (error) return <p>Error :(</p>;

  const columnCount = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <Container className="app" padding="0px 15px" maxWidth="1200px">
      <h1>Tigerhall Content</h1>
      <SearchBar
        onChange={(e) => handleSearch(e.target.value)}
        loading={loading}
      />
      {!cards.length && !loading && (
        <Text fontSize="40px" color="white" lineHeight="taller" mb="30px">
          No results found!
        </Text>
      )}
      <Grid
        templateColumns={`repeat(${columnCount}, 1fr)`}
        gap={4}
        width="full"
      >
        {!cards.length &&
          loading &&
          Array(9)
            .fill(0)
            .map((_, i) => <LoadingSkeleton key={i} />)}
        {cards.map((item: ContentCardEdge, i) => (
          <ContentCard item={item} key={i} />
        ))}
      </Grid>
    </Container>
  );
}

export default App;

import { InputGroup, Stack, Input, InputLeftElement } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <>
      <h1>Tigerhall Content</h1>
      <Stack spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <span>Icon here</span>
          </InputLeftElement>
          <Input type="tel" placeholder="Phone number" />
        </InputGroup>
      </Stack>
    </>
  );
}

export default App;

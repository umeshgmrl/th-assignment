import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import "./App.css";

function App() {
  return (
    <>
      <h1>Tigerhall Content</h1>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon />
        </InputLeftElement>
        <Input type="tel" placeholder="Phone number" size="lg" />
      </InputGroup>
    </>
  );
}

export default App;

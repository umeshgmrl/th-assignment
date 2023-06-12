import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Tigerhall Content</h1>
      <InputGroup size="lg" justifyContent="center">
        <InputLeftElement pointerEvents="none">
          <Search2Icon />
        </InputLeftElement>
        <Input type="text" placeholder="Search" />
      </InputGroup>
    </div>
  );
}

export default App;

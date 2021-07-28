import { ChakraProvider } from "@chakra-ui/react";
import Note from "./components/Note";

function App() {
  return (
    <ChakraProvider>
      <Note />
    </ChakraProvider>
  );
}

export default App;

import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import DrugSearch from "./components/DrugSearch";
import DrugDetails from "./components/DrugDetails";
import CenteredWrapper from "./components/CenteredWrapper";

function Home() {
  return (
    <CenteredWrapper>
      <Button>
        <Link to="/drugs/search">Go To Search Page</Link>
      </Button>
    </CenteredWrapper>
  );
}

function App() {
  const [results, setResults] = React.useState([]);
  return (
    <main>
      <Switch>
        <Route path="/drugs/search">
          <DrugSearch results={results} setResults={setResults} />
        </Route>
        <Route path="/drugs/:drugName">
          <DrugDetails results={results} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </main>
  );
}

export default App;

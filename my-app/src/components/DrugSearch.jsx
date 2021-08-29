import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heading,
  Text,
  IconButton,
  Box,
  Input,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { SearchIcon } from "@chakra-ui/icons";
import CenteredWrapper from "./CenteredWrapper.jsx";
import { getDrugs, getSpellingSuggestions } from "../api.js";

const DrugSearch = ({ results, setResults }) => {
  const [drugName, setDrug] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setError] = useState(false);
  const handleChange = (event) => {
    setDrug(event.target.value);
  };

  const resetState = () => {
    setResults([]);
    setSuggestions([]);
    setError(false);
  };

  const handleSearch = () => {
    if (!drugName) return;
    setIsSearching(true);
    resetState();
    getDrugs(drugName)
      .then(async ({ drugGroup: { conceptGroup } }) => {
        if (
          conceptGroup &&
          conceptGroup.some((el) => !!el.conceptProperties?.length)
        ) {
          setResults(conceptGroup);
        } else {
          const { suggestionGroup } = await getSpellingSuggestions(drugName);
          const { suggestion } = suggestionGroup?.suggestionList || {};
          if (suggestion) {
            setSuggestions(suggestion);
          } else setError(true);
        }
      })
      .finally(() => setIsSearching(false));
  };

  const hasResult =
    results.length > 0 && results.some((el) => !!el.conceptProperties?.length);

  return (
    <CenteredWrapper>
      <Helmet>
        <title>Drug Search</title>
      </Helmet>
      <Heading as="h1" size="lg">
        Search for Drugs!
      </Heading>
      <Flex
        alignItems="center"
        w={{ base: "300px", md: "500px" }}
        margin="0 auto"
        mt="2rem"
      >
        <Input
          value={drugName}
          onChange={handleChange}
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Drugs you would like to search"
          size="md"
        />

        <IconButton
          ml=".5rem"
          aria-label="Search database"
          onClick={handleSearch}
          icon={<SearchIcon />}
        />
      </Flex>

      {isSearching ? (
        <Spinner size="xl" color="red.500" mt="10rem" />
      ) : (
        <Box mt="3rem">
          {hasResult &&
            !isError &&
            results.map(({ tty, conceptProperties }) => {
              return conceptProperties?.map(({ rxcui, name }) => (
                <Link to={`/drugs/${rxcui}`} key={`${rxcui}`}>
                  <Box p="12px 24px" mt=".5rem" border="1px solid">
                    <Text>TTY: {tty}</Text>
                    <Text textAlign="start">Name: {name}</Text>
                  </Box>
                </Link>
              ));
            })}
          {!hasResult && suggestions.length > 0 && !isError && (
            <Box>
              <Text>
                Invalid input or incomplete drug name, recommendation name list
                below:
              </Text>
              {suggestions.map((suggest) => (
                <Text
                  _hover={{ cursor: "pointer", background: "gray.100" }}
                  key={suggest}
                  fontSize="md"
                  textAlign="center"
                  p="4px"
                  border="1px solid"
                  mt=".5rem"
                  onClick={() => setDrug(suggest)}
                >
                  {suggest}
                </Text>
              ))}
            </Box>
          )}
          {isError && (
            <Text color="crimson" fontWeight="bold">
              Error! No Related Drugs Exits
            </Text>
          )}
        </Box>
      )}
    </CenteredWrapper>
  );
};

export default DrugSearch;

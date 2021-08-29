import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Box, Heading, Text } from "@chakra-ui/react";
import CenteredWrapper from "./CenteredWrapper.jsx";
import { getNDCs } from "../api.js";

const DrugDetails = ({ results }) => {
  const { drugName: rxcui } = useParams();
  const [Ndcs, setNdcs] = useState([]);
  let drugInfo = {};
  results.forEach(({ conceptProperties }) => {
    conceptProperties?.forEach((drug) => {
      if (drug.rxcui === rxcui) drugInfo = drug;
    });
  });

  useEffect(() => {
    getNDCs(rxcui).then((data) => setNdcs(data.ndcGroup));
  }, [rxcui]);
  const containStyleProps = {
    w: { base: "300px", md: "500px" },
    margin: "auto",
  };
  const headerSytleProps = {
    as: "h2",
    borderBottom: "1px solid",
    paddingBottom: "1rem",
    size: "lg",
  };
  const textStyleProps = { margin: "1rem" };

  return (
    <CenteredWrapper>
      <Helmet>
        <title>Drug Details</title>
      </Helmet>
      <Box {...containStyleProps}>
        <Heading {...headerSytleProps}>Name of Drug</Heading>
        <Text {...textStyleProps}>Id: {rxcui}</Text>
        <Text {...textStyleProps}>Name: {drugInfo.name}</Text>
        <Text {...textStyleProps}>Synonym:{drugInfo.synonym}</Text>
      </Box>
      <Box {...containStyleProps}>
        <Heading {...headerSytleProps}>Associated NDCs</Heading>
        {Ndcs?.ndcList?.ndc.map((ndc) => (
          <Text {...textStyleProps} key={ndc}>
            {ndc}
          </Text>
        ))}
      </Box>
    </CenteredWrapper>
  );
};

export default DrugDetails;

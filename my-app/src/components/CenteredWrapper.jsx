import React from "react";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

/**
 * A simple container used to center content and enforce a max-width. **CenteredWrapper** is mostly used to wrap page content.
 */
function CenteredWrapper({ children, ...rest }) {
  return (
    <Box
      width="100%"
      maxWidth="1440px"
      margin="0 auto"
      textAlign="center"
      paddingX={{ base: "24px", md: "32px", lg: "40px" }}
      mt="20vh"
      {...rest}
    >
      {children}
    </Box>
  );
}

CenteredWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CenteredWrapper;

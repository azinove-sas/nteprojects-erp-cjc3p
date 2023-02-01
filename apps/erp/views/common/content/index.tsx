import React from "react";
import { Box } from "rebass";

interface ContentType {
  children: React.ReactNode;
}

const Content = ({ ...props }: ContentType) => {
  return (
    <Box
      sx={{
        display: "block",
        paddingBlock: "1.5rem",
        inlineSize: "100%",
        marginInline: "auto",
        maxInlineSize: "1440px",
        paddingInline: "1.5rem",
      }}
    >
      {props.children}
    </Box>
  );
};

export default Content;

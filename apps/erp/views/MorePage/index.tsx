import React from "react";
import Content from "@views/common/content";
import BuildDevSign from "azinove/components/templates/Azinove/BuildDevSign";

interface MorePageType {}

const MorePage = ({ ...props }: MorePageType) => {
  return (
    <Content>
      <BuildDevSign />
    </Content>
  );
};

export default MorePage;

import React from "react";
import Content from "@views/common/content";
import BuildDevSign from "azinove/components/templates/Azinove/BuildDevSign";

interface VersionsPageType {}

const VersionsPage = ({ ...props }: VersionsPageType) => {
  return (
    <Content>
      <BuildDevSign />
    </Content>
  );
};

export default VersionsPage;

import React from "react";
import Content from "@views/common/content";
import BuildDevSign from "azinove/components/templates/Azinove/BuildDevSign";

interface CrmPageType {}

const CrmPage = ({ ...props }: CrmPageType) => {
  return (
    <Content>
      <BuildDevSign />
    </Content>
  );
};

export default CrmPage;

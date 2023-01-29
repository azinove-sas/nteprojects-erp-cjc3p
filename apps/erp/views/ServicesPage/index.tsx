import React from "react";
import Content from "@views/common/content";
import BuildDevSign from "azinove/components/templates/Azinove/BuildDevSign";

interface ServicesPageType {}

const ServicesPage = ({ ...props }: ServicesPageType) => {
  return (
    <Content>
      <BuildDevSign />
    </Content>
  );
};

export default ServicesPage;

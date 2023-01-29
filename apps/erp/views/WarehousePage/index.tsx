import React from "react";
import Content from "@views/common/content";
import BuildDevSign from "azinove/components/templates/Azinove/BuildDevSign";

interface WarehousePageType {}

const WarehousePage = ({ ...props }: WarehousePageType) => {
  return (
    <Content>
      <BuildDevSign />
    </Content>
  );
};

export default WarehousePage;

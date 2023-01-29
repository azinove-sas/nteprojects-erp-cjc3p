import React from "react";
import Content from "@views/common/content";
import BuildDevSign from "azinove/components/templates/Azinove/BuildDevSign";

interface AdminPageType {}

const AdminPage = ({ ...props }: AdminPageType) => {
  return (
    <Content>
      <BuildDevSign />
    </Content>
  );
};

export default AdminPage;

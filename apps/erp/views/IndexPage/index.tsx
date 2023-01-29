import React from "react";
import { useSession } from "next-auth/react";
import { Box } from "rebass";
import Content from "@views/common/content";

interface IndexPageType {}

const IndexPage = ({ ...props }: IndexPageType) => {
  const { data: session } = useSession();

  return (
    <Content>
      {session && (
        <>
          Signed in as{" "}
          {
            // @ts-ignore
            session.user.email
          }{" "}
          <br />
        </>
      )}
    </Content>
  );
};

export default IndexPage;

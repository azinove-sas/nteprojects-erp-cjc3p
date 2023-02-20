import React from "react";
import Content from "@views/common/content";

interface IndexPageType {
  session: any
}

const IndexPage = ({ ...props }: IndexPageType) => {

  return (
    <Content>
      {props.session && (
        <>
          Signed in as{" "}
          {
            // @ts-ignore
            props.session.user.email
          }{" "}
          <br />
        </>
      )}
    </Content>
  );
};

export default IndexPage;

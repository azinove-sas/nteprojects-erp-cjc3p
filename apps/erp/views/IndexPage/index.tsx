import React from "react";
import { useSession } from "next-auth/react";

interface IndexPageType {}

const IndexPage = ({ ...props }: IndexPageType) => {
  const { data: session } = useSession();

  return (
    <>
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
    </>
  );
};

export default IndexPage;

import React from "react";
import Content from "@views/common/content";
import BuildDevSign from "azinove/components/templates/Azinove/BuildDevSign";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface AdminPageType { }

const AdminPage = ({ ...props }: AdminPageType) => {

  const { data: session } = useSession();
  const router = useRouter();

  // @ts-ignore
  if (session?.user?.role < 1) { router.push('/') }

  return (
    <Content>
      <BuildDevSign />
    </Content>
  );
};

export default AdminPage;

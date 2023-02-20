import type { ReactElement } from "react";
import { useEffect } from "react";
import type { NextPageWithLayout } from "../../_app";
import Layout from "azinove/components/common/Layout";
import React from "react";

import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import AddPage from "@views/CertificationPage/AddPage";

import config from "@config/seo_meta.json";

import { useSession } from "next-auth/react";
import getPermissions from "azinove/libraries/permissions/getPermissions";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = ({ data }: any) => {
  const { data: session } = useSession();
  const router = useRouter();

  // @ts-ignore
  const permissions = getPermissions(session?.user?.permissions);
  useEffect(() => {
    if (session) {
      // @ts-ignore
      if (!permissions.access && session?.user?.role < 1) {
        router.push("/");
      }
    }
  }, [permissions.access, router, session]);

  // @ts-ignore
  if (!session || (!permissions.access && session?.user?.role < 1)) {
    return <></>;
  }
  return <AddPage />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      navbarComponent={<Navbar />}
      footerComponent={<Footer />}
      config={config}
      seo={page.props.seo}
    >
      {page}
    </Layout>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      seo: {
        title: "Template",
        description: "Template",
        openGraph: {
          title: "Template",
          description: "Template",
        },
      },
    },
  };
};

export default Page;

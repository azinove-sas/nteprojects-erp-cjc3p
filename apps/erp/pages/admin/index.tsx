import type { ReactElement } from "react";
import { useEffect } from "react";
import type { NextPageWithLayout } from "../_app";
import Layout from "azinove/components/common/Layout";
import React from "react";

import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import AdminPage from "@views/AdminPage";

import config from "@config/seo_meta.json";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // @ts-ignore
      if (session?.user?.role < 1) {
        router.push("/");
      }
    }
  }, [router, session]);

  // @ts-ignore
  if (!session || session?.user?.role < 1) {
    return <></>;
  }
  return <AdminPage />;
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

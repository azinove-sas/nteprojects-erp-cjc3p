import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "azinove/components/common/Layout";
import React from "react";

import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import IndexPage from "@views/IndexPage";

import config from "@config/seo_meta.json";

const Page: NextPageWithLayout = () => {
  return <IndexPage />;
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

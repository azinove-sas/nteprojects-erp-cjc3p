import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../_app";
import Layout from "azinove/components/common/Layout";
import React from "react";

import type { GetStaticPaths } from "next";

import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import InfoPage from "@views/CertificationPage/InfoPage";

import config from "@config/seo_meta.json";
import { REALTIME_DB } from "azinove/libraries/Firebase";
import { get, ref } from "firebase/database";

const Page: NextPageWithLayout = ({ data }: any) => {
  return <InfoPage data={data} />;
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

export const getStaticPaths: GetStaticPaths = async () => {
  // GetPath
  let PATHS: any = [];
  const PATH_sitemap = "/CERTIFICAT";
  const PATH_DATA: any = (await get(ref(REALTIME_DB, PATH_sitemap))).toJSON();

  Object.entries(PATH_DATA).map((item, i) => {
    PATHS.push('/certification/info/' + item[0]);
  })

  // Set PATHS
  return {
    paths: PATHS,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  console.log(params);

  const DATA: any = (await get(ref(REALTIME_DB, "CERTIFICAT/" + params.certificateID))).toJSON();
  return {
    props: {
      data: DATA,
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

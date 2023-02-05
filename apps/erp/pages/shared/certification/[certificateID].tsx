import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../_app";
import Layout from "azinove/components/common/Layout";
import React from "react";

import type { GetStaticPaths, GetStaticProps } from "next";

import CertificationPage from "@views/shared/CertificationPage";

import { REALTIME_DB } from "azinove/libraries/Firebase";
import { get, ref } from "firebase/database";

const Page: NextPageWithLayout = ({ data }: any) => {
  return <CertificationPage data={data} />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
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

  if (PATH_DATA) {
    Object.entries(PATH_DATA).map((item, i) => {
      PATHS.push('/shared/certification/' + item[0]);
    })
  }

  // Set PATHS
  return {
    paths: PATHS,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {

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

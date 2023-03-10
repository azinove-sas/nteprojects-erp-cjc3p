import type { ReactElement } from "react";
import { useEffect } from "react";
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

  if (PATH_DATA) {
    Object.entries(PATH_DATA).map((item, i) => {
      PATHS.push('/certification/info/' + item[0]);
    })
  }

  // Set PATHS
  return {
    paths: PATHS,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: any) => {

  const DATA: any = (await get(ref(REALTIME_DB, "CERTIFICAT/" + params.certificateID))).toJSON();

  if (!DATA) {
    return {
      notFound: true
    }
  }
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

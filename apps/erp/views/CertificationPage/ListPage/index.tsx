import React, { useEffect, useState } from "react";
import Content from "@views/common/content";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useCertificat from "@utils/useCertificat";
import Table_1 from "azinove/UiKit/table/Table_1";
import Button_1 from "azinove/UiKit/button/Button_1";

interface ListPageType { }

const ListPage = ({ ...props }: ListPageType) => {
  const router = useRouter();
  const { data: session } = useSession();


  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  // @ts-ignore
  const { data: certificate, isLoading } = useCertificat(page, perPage, String(session?.user?.email), String(session?.user?.role));


  const list = certificate?.data.map((i: any) => {
    return {
      col1: i.certificateID,
      col2: <Button_1 text="..." onClick={() => router.push("/certification/info/" + i.certificateID)} />,
    };
  });
  const data = React.useMemo(() => list, [certificate]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Sticker No",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "More Information",
        accessor: "col2",
      },
    ],
    []
  );

  return (
    <Content>
      {isLoading ? (
        <>
          <div>loading...</div>
        </>
      ) : (
        <Table_1
          data={data}
          columns={columns}
          setPage={setPage}
          setPerPage={setPerPage}
          currentpage={page}
          perPage={perPage}
          totalPage={certificate?.totalPages}
        />
      )}
    </Content>
  );
};

export default ListPage;

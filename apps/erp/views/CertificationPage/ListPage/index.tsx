import React, { useState } from "react";
import Content from "@views/common/content";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useCertificat from "@utils/useCertificat";
import Table_1 from "azinove/UiKit/table/Table_1";
import Button_1 from "azinove/UiKit/button/Button_1";
import { AiFillEye } from "react-icons/ai";
import { Text } from "rebass";

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
      col2: i.selectedUser,
      col3: <Button_1 text={<AiFillEye size={22} />} onClick={() => router.push("/certification/info/" + i.certificateID)} />,
    };
  });
  const data = React.useMemo(() => list, [certificate]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Sticker UUID",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Inspector",
        accessor: "col2",
      },
      {
        Header: "More Information",
        accessor: "col3",
      },
    ],
    []
  );

  console.log(certificate);
  return (
    <Content>
      {isLoading ? (
        <>
          <div>loading...</div>
        </>
      ) : (
        <>
          {certificate?.totalPages >= 1 ? (
            <>
              <Table_1
                data={data}
                columns={columns}
                setPage={setPage}
                setPerPage={setPerPage}
                currentpage={page}
                perPage={perPage}
                totalPage={certificate?.totalPages}
              />
            </>
          ) : (
            <>
              <Text as={'h2'} textAlign={'center'}>NO DATA AVAILABLE</Text>
            </>
          )}
        </>
      )}
    </Content>
  );
};

export default ListPage;

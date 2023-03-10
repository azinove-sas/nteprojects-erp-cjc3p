import React, { useEffect, useState } from "react";
import Content from "@views/common/content";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Text, Flex } from "rebass";
import { Label, Select, Input } from '@rebass/forms'
import useAdminUserList from "@utils/useAdminUserList";
import { CERTIFICAT } from "@constant/certificateList";
import { certificationIndex } from "@components/certification/certificationIndex";
import Button_17 from "azinove/UiKit/button/Button_17";
import Certification0 from "@components/certification/certification0";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import { AiFillPrinter } from "react-icons/ai"
import UseAnimations from "react-useanimations";
import loading2 from 'react-useanimations/lib/loading2';

interface AddPageType { }

const AddPage = ({ ...props }: AddPageType) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [selectedCertificat, setSelectedCertificate] = useState(-1);
  const [selectedCertificatError, setSelectedCertificatError] = useState<boolean>(false);
  const [number, setNumber] = useState(1);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedUserError, setSelectedUserError] = useState<boolean>(false);

  const [generationLoading, setGenerationLoading] = useState<boolean>(false);
  const [backUpData, setBackUpData] = useState();
  const [readyPrint, setReadyPrint] = useState<boolean>(false);
  const [loadingPrint, setLoadingPrint] = useState<boolean>(false);

  const { data: data, isLoading } = useAdminUserList();

  const handleGeneratePdf = async () => {
    setLoadingPrint(true);
    const data: any = document.getElementById('pdf');

    html2canvas(data).then((canvas: any) => {
      const imgWidth = 220;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      heightLeft -= pageHeight;
      const doc = new jsPDF('p', 'mm');
      doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }
      let fileName = selectedUser + "-" + number + ".pdf";
      doc.save(String(fileName));
      setLoadingPrint(false);
    });
  };

  const submitRequest = async () => {
    // handleGeneratePdf();
    // return;

    if (!selectedUser) {
      setSelectedUserError(true)
    } else {
      setSelectedUserError(false);
    }
    if (selectedCertificat == -1 || !selectedCertificat) {
      setSelectedCertificatError(true)
    } else {
      setSelectedCertificatError(false)
    }

    if (!selectedUser || selectedCertificat == -1 || !selectedCertificat) {
      return;
    }
    setGenerationLoading(true);
    const response = await fetch("/api/certificat/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        number: number,
        selectedCertificat: selectedCertificat,
        selectedUser: selectedUser,
      }),
    });


    const res = await response.json();
    if (res.success) {
      setBackUpData(res.BackUpData);
      setGenerationLoading(false);
      setReadyPrint(true);
    } else {
      setGenerationLoading(false);
    }
  }

  // @ts-ignore
  if (session?.user?.role < 1) {
    router.push("/");
  }

  if (isLoading) return <Text as={"p"}>Loading...</Text>;
  return (
    <Content>
      <Box>
        <Label fontSize={20} my={2} htmlFor='certificate'>Certificate Type</Label>
        {selectedCertificatError && (<Label color='red' fontSize={18} mt={1}>Please select a Certificat</Label>)}
        <Select
          id='certificate'
          name='certificate'
          bg={'white'}
          // @ts-ignore
          onChange={(event) => setSelectedCertificate(event.target.value.split(" | ")[0])}
          defaultValue='Select'>
          <option value={''}>
            Select
          </option>
          {CERTIFICAT.map((item, key) => (
            <option
              key={key}>
              {item.ID} | {item.name}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Label fontSize={20} my={2} htmlFor='user'>Select User</Label>
        {selectedUserError && (<Label color='red' fontSize={18} mt={1}>Please select a User</Label>)}
        <Select
          id='user'
          name='user'
          bg={'white'}
          // @ts-ignore
          onChange={(event) => setSelectedUser(event.target.value.split(" | ")[0])}
          defaultValue='Select'>
          <option value={'-1'} key={-1}>
            Select
          </option>
          {Object.entries(data).map(([key, item]: any) => (
            <option
              key={key}>
              {item.email} | {item.name}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Label fontSize={20} my={2} htmlFor='number'>Number Of Certificate</Label>
        <Input
          id='number'
          name='number'
          type='number'
          bg={'white'}
          placeholder='1'
          defaultValue='1'
          // @ts-ignore
          onChange={(event) => setNumber(event.target.value)}
        />
      </Box>

      <Flex justifyContent={'center'} my={2}>
        {!generationLoading ? (
          <>
            {readyPrint ? (
              <Box
                as={"button"}
                sx={{
                  padding: "15px",
                  width: "25px",
                  height: "25px",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  boxShadow:
                    "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                  background: "#639",
                  color: "white",
                  ":hover": {
                    background: "#238fce",
                  },
                }}
                onClick={handleGeneratePdf}
              >
                {loadingPrint ? (
                  <UseAnimations animation={loading2} size={22} fillColor={'white'} />
                ) : (
                  <AiFillPrinter size={20} />
                )}
              </Box>
            ) : (
              <Button_17 onClick={() => submitRequest()}>Generate</Button_17>
            )}
          </>
        ) : (
          <>
            Loading ...
          </>
        )}
      </Flex>

      {(selectedCertificat != -1 && selectedCertificat) && (
        <>
          <Flex mt={4}>
            <Box width={'100%'}>
              <Label justifyContent={'center'} fontSize={20} my={2} htmlFor='number'>Exemple of the selected Certificat:</Label>
              <Label justifyContent={'center'} fontSize={20} fontWeight={600} my={2} htmlFor='certificateName'>{CERTIFICAT.at(selectedCertificat)?.name}</Label>
            </Box>
          </Flex>
          <Flex justifyContent={'center'} my={3}>
            {selectedCertificat != -1 && certificationIndex.at(selectedCertificat)?.children}
          </Flex>
          <Box sx={{ maxHeight: '0', overflow: 'auto', }}>
            {backUpData && (
              <Box id={'pdf'} sx={{
                width: '220mm',
              }}>
                {Object.entries(backUpData).map((element: any, i) => {
                  return (
                    <Flex key={i} sx={{
                      flexFlow: 'wrap',
                      height: '297mm',
                    }}>
                      <>
                        {element[1].map((item: any, j: number) => (
                          <Certification0 key={'num-' + j} {...item.certificateInfo} link={item.sharedLink} print />
                        ))}
                      </>
                    </Flex>
                  )
                })}
              </Box>
            )}
          </Box>
        </>
      )}
    </Content>
  );
};

export default AddPage;

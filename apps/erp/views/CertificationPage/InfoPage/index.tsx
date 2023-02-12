import React, { useRef, useState } from "react";
import Content from "@views/common/content";
import { Flex, Text, Box, Link } from "rebass";
import Certification0 from "@components/certification/certification0";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import { AiFillPrinter } from "react-icons/ai"
import UseAnimations from "react-useanimations";
import loading2 from 'react-useanimations/lib/loading2';

interface InfoPageType {
    data: any;
}

const InfoPage = ({ ...props }: InfoPageType) => {
    let reportTemplateRef: any = useRef();

    const [reload, setReload] = useState<boolean>(false);
    const [loadingPrint, setLoadingPrint] = useState<boolean>(false);
    const [certificateInfo, setData] = useState<any>(props.data.certificateInfo);

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
            doc.addImage(canvas, 'WEBP', 0, position, imgWidth, imgHeight, '', 'FAST');
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(canvas, 'WEBP', 0, position, imgWidth, imgHeight, '', 'FAST');
                heightLeft -= pageHeight;
            }
            doc.save(props.data.certificateID);
            setLoadingPrint(false);
        });
    };

    return (
        <Content>
            <Flex textAlign={'center'} flexDirection={'column'} my={3}>
                <Text as={'h2'}>Inspector: {props.data.selectedUser}</Text>
                <Text as={'h2'}>Link: {process.env.NEXT_PUBLIC_URL + props.data.sharedLink}</Text>
            </Flex>
            <Flex
                my={3}
                p={3}
                sx={{
                    position: "relative",
                    flexDirection: "column",
                    minWidth: 0,
                    wordWrap: "break-word",
                    backgroundColor: "#fff",
                    backgroundClip: "border-box",
                    borderRadius: "10px",
                    boxShadow:
                        "0 4px 20px 1px rgb(0 0 0 / 6%), 0 1px 4px rgb(0 0 0 / 8%)",
                    border: "0",
                    alignItems: "end",
                }}
            >
                <Link>
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
                </Link>
            </Flex>
            <Flex justifyContent={'center'} my={3}>
                <Certification0 {...certificateInfo} certificateID={props.data.certificateID} link={props.data.sharedLink} edit reload={setReload} setData={setData} />
            </Flex>
            <Box sx={{
                // maxHeight: '0',
                overflow: 'auto',
            }}>
                {!reload && (
                    <Flex ref={reportTemplateRef} id={'pdf'} sx={{
                        flexFlow: 'row wrap',
                        width: '220mm',
                        height: 'auto',

                    }}>
                        <Certification0 {...certificateInfo} certificateID={props.data.certificateID} link={props.data.sharedLink} print />
                    </Flex>
                )}
            </Box>
        </Content >

    );
};

export default InfoPage;

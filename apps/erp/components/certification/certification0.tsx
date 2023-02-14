import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";
import { Box, Image, Flex, Button, Text } from "rebass";
import { Input } from "@rebass/forms";

interface Certification0Type {
    stickerNo?: string;
    clientName?: string,
    equipmentDetail?: string,
    equipmentSN?: string,
    inspectionDate?: string,
    nextInspectionDate?: string,
    inspectedBy?: string,
    edit?: true;
    print?: true;
    link?: string;
    certificateID?: string;
    bg?: string;
    reload?: any;
    setData?: any;
}

const Certification0 = ({ ...props }: Certification0Type) => {

    const canvasRef = useRef();

    const [stickerNo, setStickerNo] = useState<string>();
    const [clientName, setClientName] = useState<string>();
    const [equipmentDetail, setEquipmentDetail] = useState<string>();
    const [equipmentSN, setEquipmentSn] = useState<string>();
    const [inspectedBy, setInspectedBy] = useState<string>();
    const [inspectionDate, setInspectionDate] = useState<string>();
    const [nextInspectionDate, setNextInspectionDate] = useState<string>();

    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [one, setOne] = useState<boolean>(false);

    useEffect(() => {
        if (props.edit && !one) {
            setStickerNo(props.stickerNo);
            setClientName(props.clientName);
            setEquipmentDetail(props.equipmentDetail);
            setEquipmentSn(props.equipmentSN);
            setInspectedBy(props.inspectedBy);
            setInspectionDate(props.inspectionDate);
            setNextInspectionDate(props.nextInspectionDate);
            setOne(true);
        }

        // if (!props.print) {
        QRCode.toCanvas(
            canvasRef.current,
            // @ts-ignore
            process.env.NEXT_PUBLIC_URL + props.link || process.env.NEXT_PUBLIC_URL + "/",
            {
                width: 110,
                margin: 3
            }
        );
        // }

    }, [props.link]);

    const saveData = async () => {
        props.reload(true);
        setSuccess(false);
        setError(false);
        const response = await fetch("/api/certificat/setCertificat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
                uuid: props.certificateID,
                selectedCertificat: 0,
                props: {
                    stickerNo: stickerNo,
                    equipmentSN: equipmentSN,
                    clientName: clientName,
                    equipmentDetail: equipmentDetail,
                    inspectionDate: inspectionDate,
                    nextInspectionDate: nextInspectionDate,
                    inspectedBy: inspectedBy,
                },
            }),
        });

        const res: any = await response.json();

        if (res.success) {
            props.setData({
                stickerNo: stickerNo,
                equipmentSN: equipmentSN,
                clientName: clientName,
                equipmentDetail: equipmentDetail,
                inspectionDate: inspectionDate,
                nextInspectionDate: nextInspectionDate,
                inspectedBy: inspectedBy,
            })
            setStickerNo(stickerNo);
            setClientName(clientName);
            setEquipmentDetail(equipmentDetail);
            setEquipmentSn(equipmentSN);
            setInspectedBy(inspectedBy);
            setInspectionDate(inspectionDate);
            setNextInspectionDate(nextInspectionDate);
            setSuccess(true);
            setError(false);
        } else {
            setSuccess(false);
            setError(true);
        }
        props.reload(false);
    }

    if (props.print) {

        return (
            <Box
                p={3}
                sx={{
                    width: '105mm',
                    height: '105mm',
                    border: '0.5px solid black',
                }}>
                <Flex flexDirection={'row'} py={1} sx={{
                    "@media (max-width: 960px)": {
                        flexDirection: 'column',
                        textAlign: 'center',
                    }
                }}>
                    <Flex width={'35%'} alignItems={'center'}>
                        <Image src="/static/images/logo/logo-transparent.webp" width={'100%'} height={'20mm'} alt={'logo'} />
                    </Flex>
                    <Flex fontSize={'2mm'} width={'40%'} pl={2} fontWeight={700} alignItems={'center'} justifyContent={'center'} >
                        Al Najm Al Thaqib Contracting Co.<br />
                        PO BOX NO. 74, JUBAIL-31951, KSA <br />
                        Tel No: +966 (13) 361 7065 / 7004 / 7005 <br />
                        Email: info@nteprojects.com <br />
                    </Flex>
                    <Flex width={'25%'} alignItems={'center'}>
                        <Box as={'canvas'} ref={canvasRef} height={'10mm'} />
                    </Flex>
                </Flex>
                <Box as={'hr'} sx={{
                    display: 'block',
                    flex: '1 1 100%',
                    height: '0px',
                    maxHeight: '0px',
                    transition: 'inherit',
                    borderStyle: 'solid',

                    borderWidth: 'thin 0 0 0',
                }} />
                <Flex flexDirection={'column'} py={3}>
                    <Flex width={'100%'} alignItems={'center'} py={1} sx={{
                        "@media (max-width: 960px)": {
                            textAlign: 'center',
                            flexDirection: 'column',
                        }
                    }}>
                        <Box width={'35%'} py={1} fontSize={'13px'} fontWeight={800}
                            sx={{
                                borderRight: '1px solid black',
                            }}>
                            STICKER NO.
                        </Box>
                        <Box width={'65%'} fontSize={'13px'} color={'red'} textAlign={'center'} fontWeight={800}>
                            {props.stickerNo && props.stickerNo}
                        </Box>
                    </Flex>
                    <Flex width={'100%'} alignItems={'center'} py={1} sx={{
                        borderBlockStart: '1px solid black',
                        borderBlockEnd: '1px solid black',
                        "@media (max-width: 960px)": {
                            textAlign: 'center',
                            flexDirection: 'column',
                        }
                    }}>
                        <Box width={'35%'} py={1} fontSize={'13px'} fontWeight={800}
                            sx={{
                                borderRight: '1px solid black',
                            }}>
                            CLIENT NAME
                        </Box>
                    </Flex>
                    <Flex width={'100%'} alignItems={'center'} py={1} sx={{
                        borderBlockEnd: '1px solid black',
                        "@media (max-width: 960px)": {
                            textAlign: 'center',
                            flexDirection: 'column',
                        }
                    }}>
                        <Box width={'35%'} py={1} fontSize={'13px'} fontWeight={800}
                            sx={{
                                borderRight: '1px solid black',
                            }}>
                            EQUIP. DETAIL
                        </Box>
                    </Flex>
                    <Flex width={'100%'} alignItems={'center'} py={1} sx={{
                        borderBlockEnd: '1px solid black',
                        "@media (max-width: 960px)": {
                            textAlign: 'center',
                            flexDirection: 'column',
                        }
                    }}>
                        <Box width={'35%'} py={1} fontSize={'13px'} fontWeight={800}
                            sx={{
                                borderRight: '1px solid black',
                            }}>
                            EQUIPE. SN
                        </Box>
                    </Flex>
                    <Flex width={'100%'} alignItems={'center'} py={1} sx={{
                        borderBlockEnd: '1px solid black',
                        "@media (max-width: 960px)": {
                            textAlign: 'center',
                            flexDirection: 'column',
                        }
                    }}>
                        <Box width={'35%'} py={1} fontSize={'13px'} fontWeight={800}
                            sx={{
                                borderRight: '1px solid black',
                            }}>
                            INSP. DATE
                        </Box>
                    </Flex>
                    <Flex width={'100%'} alignItems={'center'} py={1} sx={{
                        borderBlockEnd: '1px solid black',
                        "@media (max-width: 960px)": {
                            textAlign: 'center',
                            flexDirection: 'column',
                        }
                    }}>
                        <Box width={'35%'} py={1} fontSize={'13px'} fontWeight={800}
                            sx={{
                                borderRight: '1px solid black',
                            }}>
                            NEXT INSP. DATE
                        </Box>
                    </Flex>
                    <Flex width={'100%'} alignItems={'center'} py={1} sx={{
                        "@media (max-width: 960px)": {
                            textAlign: 'center',
                            flexDirection: 'column',
                        }
                    }}>
                        <Box width={'35%'} py={1} fontSize={'13px'} fontWeight={800}
                            sx={{
                                borderRight: '1px solid black',
                            }}>
                            INSP. BY
                        </Box>
                    </Flex>
                </Flex>
            </Box >
        )
    }


    return (
        <Flex flexDirection={'column'} width={'55%'} backgroundColor={'white'} p={3} sx={{
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            "@media (max-width: 960px)": {
                width: '100%',
            }
        }}>
            <Flex flexDirection={'row'} py={1} sx={{
                "@media (max-width: 960px)": {
                    flexDirection: 'column',
                    textAlign: 'center',
                }
            }}>
                <Flex width={'35%'} alignItems={'center'} sx={{
                    "@media (max-width: 960px)": {
                        width: '100%',
                    }
                }}>
                    <Image src="/static/images/logo/logo-transparent.webp" width={'100%'} height={'90%'} alt={'logo'} />
                </Flex>
                <Flex width={'40%'} pl={2} fontWeight={700} alignItems={'center'} justifyContent={'center'} sx={{
                    "@media (max-width: 960px)": {
                        pl: 0,
                        width: '100%',
                    }
                }}>
                    Al Najm Al Thaqib Contracting Co.<br />
                    PO BOX NO. 74, JUBAIL-31951, KSA <br />
                    Tel No: +966 (13) 361 7065 / 7004 / 7005 <br />
                    Email: info@nteprojects.com <br />
                </Flex>
                <Flex width={'25%'} alignItems={'center'} justifyContent={'center'} sx={{
                    "@media (max-width: 960px)": {
                        width: '100%',
                        justifyContent: 'center'
                    }
                }}>
                    <Box as={'canvas'} ref={canvasRef} />
                </Flex>
            </Flex>
            <Box as={'hr'} sx={{
                display: 'block',
                flex: '1 1 100%',
                height: '0px',
                maxHeight: '0px',
                transition: 'inherit',
                borderStyle: 'solid',
                px: 4,
                borderWidth: 'thin 0 0 0',
            }} />
            <Flex flexDirection={'column'} py={3}>
                <Flex width={'100%'} alignItems={'center'} my={2} sx={{
                    "@media (max-width: 960px)": {
                        textAlign: 'center',
                        flexDirection: 'column',
                    }
                }}>
                    <Box width={'50%'} py={1} fontSize={'22px'} fontWeight={800}>
                        STICKER NO.
                    </Box>
                    <Box width={'50%'} fontSize={'13px'} fontWeight={800}>
                        <>
                            {props.stickerNo ? props.stickerNo : ":......................................................."}
                        </>
                    </Box>
                </Flex>
                <Flex width={'100%'} alignItems={'center'} my={2} sx={{
                    "@media (max-width: 960px)": {
                        textAlign: 'center',
                        flexDirection: 'column',
                    }
                }}>
                    <Box width={'50%'} py={1} fontSize={'22px'} fontWeight={800}>
                        CLIENT NAME
                    </Box>
                    <Box width={'50%'} fontSize={'13px'} fontWeight={800}>
                        {props.edit ? (
                            <Input value={equipmentSN} onChange={(event) => setEquipmentSn(event.target.value)} />
                        ) : (
                            <>
                                {props.equipmentSN ? props.equipmentSN : ":......................................................."}
                            </>
                        )}
                    </Box>
                </Flex>
                <Flex width={'100%'} alignItems={'center'} my={2} sx={{
                    "@media (max-width: 960px)": {
                        textAlign: 'center',
                        flexDirection: 'column',
                    }
                }}>
                    <Box width={'50%'} py={1} fontSize={'22px'} fontWeight={800}>
                        EQUIP. DETAIL
                    </Box>
                    <Box width={'50%'} fontSize={'13px'} fontWeight={800}>
                        {props.edit ? (
                            <Input value={clientName} onChange={(event) => setClientName(event.target.value)} />
                        ) : (
                            <>
                                {props.clientName ? props.clientName : ":......................................................."}
                            </>
                        )}
                    </Box>
                </Flex>
                <Flex width={'100%'} alignItems={'center'} my={2} sx={{
                    "@media (max-width: 960px)": {
                        textAlign: 'center',
                        flexDirection: 'column',
                    }
                }}>
                    <Box width={'50%'} py={1} fontSize={'22px'} fontWeight={800}>
                        EQUIPE. SN
                    </Box>
                    <Box width={'50%'} fontSize={'13px'} fontWeight={800}>
                        {props.edit ? (
                            <Input value={equipmentDetail} onChange={(event) => setEquipmentDetail(event.target.value)} />
                        ) : (
                            <>
                                {props.equipmentDetail ? props.equipmentDetail : ":......................................................."}
                            </>
                        )}
                    </Box>
                </Flex>
                <Flex width={'100%'} alignItems={'center'} my={2} sx={{
                    "@media (max-width: 960px)": {
                        textAlign: 'center',
                        flexDirection: 'column',
                    }
                }}>
                    <Box width={'50%'} py={1} fontSize={'22px'} fontWeight={800}>
                        INSP. DATE
                    </Box>
                    <Box width={'50%'} fontSize={'13px'} fontWeight={800}>
                        {props.edit ? (
                            <Input value={inspectionDate} onChange={(event) => setInspectionDate(event.target.value)} />
                        ) : (
                            <>
                                {props.inspectionDate ? props.inspectionDate : ":......................................................."}
                            </>
                        )}
                    </Box>
                </Flex>
                <Flex width={'100%'} alignItems={'center'} my={2} sx={{
                    "@media (max-width: 960px)": {
                        textAlign: 'center',
                        flexDirection: 'column',
                    }
                }}>
                    <Box width={'50%'} py={1} fontSize={'22px'} fontWeight={800}>
                        NEXT INSP. DATE
                    </Box>
                    <Box width={'50%'} fontSize={'13px'} fontWeight={800}>
                        {props.edit ? (
                            <Input value={nextInspectionDate} onChange={(event) => setNextInspectionDate(event.target.value)} />
                        ) : (
                            <>
                                {props.nextInspectionDate ? props.nextInspectionDate : ":......................................................."}
                            </>
                        )}
                    </Box>
                </Flex>
                <Flex width={'100%'} alignItems={'center'} my={2} sx={{
                    "@media (max-width: 960px)": {
                        textAlign: 'center',
                        flexDirection: 'column',
                    }
                }}>
                    <Box width={'50%'} py={1} fontSize={'22px'} fontWeight={800}>
                        INSP. BY
                    </Box>
                    <Box width={'50%'} fontSize={'13px'} fontWeight={800}>
                        {props.edit ? (
                            <Input value={inspectedBy} onChange={(event) => setInspectedBy(event.target.value)} />
                        ) : (
                            <>
                                {props.inspectedBy ? props.inspectedBy : ":......................................................."}
                            </>
                        )}
                    </Box>
                </Flex>
                {props.edit && (
                    <>
                        {success && (
                            <Flex justifyContent={"center"}>
                                <Text color={'green'}>Data has been Saved</Text>
                            </Flex>
                        )}
                        {error && (
                            <Flex justifyContent={"center"}>
                                <Text color={'red'}>Error, please contact an Administrator!</Text>
                            </Flex>
                        )}
                        <Button mt={2} bg={'red'} onClick={() => saveData()}>Save</Button>
                    </>
                )}
            </Flex>
        </Flex >
    );
};

export default Certification0;

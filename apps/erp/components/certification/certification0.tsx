import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";
import { Box, Image, Flex, Button, Text } from "rebass";
import { Input } from "@rebass/forms";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BsFillStickyFill } from "react-icons/bs";

interface Certification0Type {
    stickerNo?: string;
    clientName?: string,
    equipmentDetail?: string,
    equipmentSN?: string,
    inspectionDate?: string,
    nextInspectionDate?: string,

    inspectedItemType?: string,
    followedStandard?: string,
    identificationNumber?: string,
    qty?: string,
    description?: string,
    WLLorSWL?: string,
    dateofLastThoroughExamination?: string,
    dateOfThisThoroughExamination?: string,
    latestDateOfTheNextThoroughExamination?: string,
    reasonForExamination?: string,
    detaillOfAnyTest?: string,
    certificationStatus?: string,
    safeToUseYesOrNo?: string,
    instalation?: string,
    sixMontly?: string,
    twelveMontly?: string,
    writtenScheme?: string,
    exceptionalCircumstance?: string,

    inspectedBy?: string,
    edit?: true;
    print?: true;
    link?: string;
    certificateID?: string;
    bg?: string;
    reload?: any;
    setData?: any;
    add?: true;
    certificateStatus?: boolean;
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

    const [inspectedItemType, setInspectedItemType] = useState<string>();
    const [followedStandard, setFollowedStandard] = useState<string>();
    const [identificationNumber, setIdentificationNumber] = useState<string>();
    const [qty, setQty] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [WLLorSWL, setWLLorSWL] = useState<string>();
    const [dateofLastThoroughExamination, setDateofLastThoroughExamination] = useState<string>();
    const [dateOfThisThoroughExamination, setDateOfThisThoroughExamination] = useState<string>();
    const [latestDateOfTheNextThoroughExamination, setLatestDateOfTheNextThoroughExamination] = useState<string>();
    const [reasonForExamination, setReasonForExamination] = useState<string>();
    const [detaillOfAnyTest, setDetaillOfAnyTest] = useState<string>();
    const [certificationStatus, setCertificationStatus] = useState<string>();
    const [safeToUseYesOrNo, setSafeToUseYesOrNo] = useState<string>();
    const [instalation, setInstalation] = useState<string>();
    const [sixMontly, setSixMontly] = useState<string>();
    const [twelveMontly, setTwelveMontly] = useState<string>();
    const [writtenScheme, setWrittenScheme] = useState<string>();
    const [exceptionalCircumstance, setExceptionalCircumstance] = useState<string>();

    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [one, setOne] = useState<boolean>(false);

    const [selectedTab, setSelectedTab] = useState<number>(0);

    useEffect(() => {
        if (props.edit && !one) {
            setStickerNo(props.stickerNo);
            setClientName(props.clientName);
            setEquipmentDetail(props.equipmentDetail);
            setEquipmentSn(props.equipmentSN);
            setInspectedBy(props.inspectedBy);

            setInspectedItemType(props.inspectedItemType);
            setFollowedStandard(props.followedStandard);
            setInspectionDate(props.inspectionDate);
            setNextInspectionDate(props.nextInspectionDate);
            setIdentificationNumber(props.identificationNumber);
            setQty(props.qty);
            setDescription(props.description);
            setWLLorSWL(props.WLLorSWL);
            setDateofLastThoroughExamination(props.dateofLastThoroughExamination);
            setDateOfThisThoroughExamination(props.dateOfThisThoroughExamination);
            setLatestDateOfTheNextThoroughExamination(props.latestDateOfTheNextThoroughExamination);
            setReasonForExamination(props.reasonForExamination);
            setDetaillOfAnyTest(props.detaillOfAnyTest);
            setCertificationStatus(props.certificationStatus);
            setSafeToUseYesOrNo(props.safeToUseYesOrNo);
            setInstalation(props.instalation);
            setSixMontly(props.sixMontly);
            setTwelveMontly(props.twelveMontly);
            setWrittenScheme(props.writtenScheme);
            setExceptionalCircumstance(props.exceptionalCircumstance);

            setOne(true);
        }

        if (selectedTab === 0) {
            QRCode.toCanvas(
                canvasRef.current,
                // @ts-ignore
                process.env.NEXT_PUBLIC_URL + props.link || process.env.NEXT_PUBLIC_URL + "/",
                {
                    width: 110,
                    margin: 3
                }
            );
        }

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

                    inspectedItemType: inspectedItemType,
                    followedStandard: followedStandard,
                    identificationNumber: identificationNumber,
                    qty: qty,
                    description: description,
                    WLLorSWL: WLLorSWL,
                    dateofLastThoroughExamination: dateofLastThoroughExamination,
                    dateOfThisThoroughExamination: dateOfThisThoroughExamination,
                    latestDateOfTheNextThoroughExamination: latestDateOfTheNextThoroughExamination,
                    reasonForExamination: reasonForExamination,
                    detaillOfAnyTest: detaillOfAnyTest,
                    certificationStatus: certificationStatus,
                    safeToUseYesOrNo: safeToUseYesOrNo,
                    instalation: instalation,
                    sixMontly: sixMontly,
                    twelveMontly: twelveMontly,
                    writtenScheme: writtenScheme,
                    exceptionalCircumstance: exceptionalCircumstance,
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

                inspectedItemType: inspectedItemType,
                followedStandard: followedStandard,
                identificationNumber: identificationNumber,
                qty: qty,
                description: description,
                WLLorSWL: WLLorSWL,
                dateofLastThoroughExamination: dateofLastThoroughExamination,
                dateOfThisThoroughExamination: dateOfThisThoroughExamination,
                latestDateOfTheNextThoroughExamination: latestDateOfTheNextThoroughExamination,
                reasonForExamination: reasonForExamination,
                detaillOfAnyTest: detaillOfAnyTest,
                certificationStatus: certificationStatus,
                safeToUseYesOrNo: safeToUseYesOrNo,
                instalation: instalation,
                sixMontly: sixMontly,
                twelveMontly: twelveMontly,
                writtenScheme: writtenScheme,
                exceptionalCircumstance: exceptionalCircumstance,
            })
            setStickerNo(stickerNo);
            setClientName(clientName);
            setEquipmentDetail(equipmentDetail);
            setEquipmentSn(equipmentSN);
            setInspectedBy(inspectedBy);
            setInspectionDate(inspectionDate);
            setNextInspectionDate(nextInspectionDate);

            setInspectedItemType(inspectedItemType);
            setFollowedStandard(followedStandard);
            setIdentificationNumber(identificationNumber);
            setQty(qty);
            setDescription(description);
            setWLLorSWL(WLLorSWL);
            setDateofLastThoroughExamination(dateofLastThoroughExamination);
            setDateOfThisThoroughExamination(dateOfThisThoroughExamination);
            setLatestDateOfTheNextThoroughExamination(latestDateOfTheNextThoroughExamination);
            setReasonForExamination(reasonForExamination);
            setDetaillOfAnyTest(detaillOfAnyTest);
            setCertificationStatus(certificationStatus);
            setSafeToUseYesOrNo(safeToUseYesOrNo);
            setInstalation(instalation);
            setSixMontly(sixMontly);
            setTwelveMontly(twelveMontly);
            setWrittenScheme(writtenScheme);
            setExceptionalCircumstance(exceptionalCircumstance);

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


    // if (!props.certificateStatus && !props.edit && !props.add) {
    //     return (
    //         <Flex
    //             my={1}
    //             p={3}
    //             sx={{
    //                 position: "relative",
    //                 flexDirection: "column",
    //                 minWidth: 0,
    //                 wordWrap: "break-word",
    //                 backgroundColor: "#fff",
    //                 backgroundClip: "border-box",
    //                 borderRadius: "10px",
    //                 textAlign: 'center',
    //                 boxShadow:
    //                     "0 4px 20px 1px rgb(0 0 0 / 6%), 0 1px 4px rgb(0 0 0 / 8%)",
    //                 border: "0",
    //             }}
    //         >
    //             <Box width={'100%'} sx={{
    //                 "@media (max-width: 960px)": {
    //                     width: '100%',
    //                 }
    //             }}>
    //                 <Image src="/static/images/logo/logo-transparent.webp" width={'200px'} height={'75px'} alt={'logo'} />
    //             </Box>
    //             <Text as={'h2'} color={'red'}>NOT APPROVED BY INSPECTOR</Text>
    //         </Flex>)
    // }
    return (
        <Flex width={'100%'} flexDirection={'column'} alignItems={'center'}>
            <Flex justifyContent={'center'} my={3}>
                <Button sx={{
                    mx: 2, bg: '#0d98ba', display: 'flex', alignItems: 'center',
                }} onClick={() => setSelectedTab(0)}> <BsFillStickyFill size={20} style={{ marginRight: "5px" }} />Sticker</Button>
                <Button sx={{
                    mx: 2, bg: '#50C878', display: 'flex', alignItems: 'center',
                }} onClick={() => setSelectedTab(1)}><AiFillSafetyCertificate size={20} style={{ marginRight: "5px" }} />Certificate</Button>
            </Flex>
            {(!props.add && props.edit) && (
                <Flex
                    my={1}
                    p={2}
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
                    {props?.certificateStatus ? (
                        <Text as={'h2'} color={'green'}>APPROVED</Text>
                    ) : (
                        <Text as={'h2'} color={'red'}>NOT APPROVED</Text>
                    )}
                </Flex>
            )}
            {selectedTab === 0 && (
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
                </Flex>
            )}
            {selectedTab === 1 && (
                <Flex bg={'white'} sx={{ border: '0.5px solid black', }} flexDirection={'column'} width={'292mm'} height={'220mm'} p={3}>
                    <Flex flexDirection={'row'} py={2}>
                        <Flex width={'15%'}>
                            <Image src="/static/images/LEEA.jpeg" height={'100px'} alt={'logo'} />
                        </Flex>
                        <Flex width={'70%'} textAlign={'center'} flexDirection={'column'}>
                            <Text as={'h1'} fontSize={'26px'} px={6}>AL-NAJM AL-THAQIB CONTRACTING CO. Certificate of Thorough Examination</Text>
                            <Text as={'h2'} fontSize={'14px'}>This Certificate Meets the Lifting Equipment Engineers Association Technical Requirements</Text>
                        </Flex>
                        <Flex width={'15%'}>
                            <Image src="/static/images/logo/logo-transparent.webp" width={'100%'} height={'100px'} alt={'logo'} />
                        </Flex>
                    </Flex>
                    <Flex flexDirection={'row'} alignItems={'end'}>
                        <Flex width={'25%'} justifyContent={'start'}>
                            <Text as={'h1'} fontSize={'12px'} px={1}>Report No: CRT.NO.ID-0021593.23</Text>
                        </Flex>
                        <Flex width={'25%'} justifyContent={'center'}>
                            <Text as={'h1'} fontSize={'12px'} px={1}>Customer No: ________</Text>
                        </Flex>
                        <Flex width={'25%'} justifyContent={'center'}>
                            <Text as={'h1'} fontSize={'12px'} px={1}>Date of Report: 01 Feb 2023</Text>
                        </Flex>
                        <Flex width={'25%'} justifyContent={'center'}>
                            <Text as={'h1'} fontSize={'12px'} px={1}>Colour Code (If required): N/A</Text>
                        </Flex>
                    </Flex>
                    <Flex sx={{ border: '1px solid black', }} flexDirection={'row'} mt={2}>
                        <Box width={'50%'} p={1} sx={{ borderRight: 'solid' }}>
                            <Text fontSize={'12px'} px={1}>Name & Address of the employer for whom the examination was made:</Text>
                            <Text fontSize={'14px'} px={1}>Name: Abdulla Nass & Partners Co.</Text>
                            <br />
                            <Text fontSize={'14px'} px={1}>Address: Dammam Saudi Arabla</Text>
                        </Box>
                        <Box width={'35%'} p={1} sx={{ borderRight: 'solid' }}>
                            <Text fontSize={'13px'} px={1}>Name & Address of the premises at which the examination was made on board:</Text>
                            <Text fontSize={'14px'} px={1}>SITE - 504:</Text>
                            <Text fontSize={'14px'} px={1}>Location: UQAIR</Text>
                        </Box>
                        <Box width={'15%'} p={1}>
                            Need a meeting
                        </Box>
                    </Flex>
                    <Flex sx={{ borderRight: '1px solid black', borderLeft: '1px solid black', borderBlockEnd: 'solid' }} flexDirection={'row'}>
                        <Flex width={'50%'} p={1} sx={{ borderRight: 'solid' }} fontWeight={700} alignItems={'center'}>
                            Inspected Item Type:
                            {props.edit ? (
                                <Input ml={2} width={150} value={inspectedItemType} onChange={(event) => setInspectedItemType(event.target.value)} />
                            ) : (
                                <>
                                    {props.inspectedItemType ? props.inspectedItemType : "......"}
                                </>
                            )}
                        </Flex>
                        <Flex width={'50%'} p={1} fontWeight={700} alignItems={'center'}>
                            Followed Standard:
                            {props.edit ? (
                                <Input ml={2} width={150} value={followedStandard} onChange={(event) => setFollowedStandard(event.target.value)} />
                            ) : (
                                <>
                                    {props.followedStandard ? props.followedStandard : "......"}
                                </>
                            )}
                        </Flex>
                    </Flex>
                    <Flex sx={{ borderRight: '1px solid black', borderLeft: '1px solid black', borderBlockEnd: 'solid' }} flexDirection={'row'}>
                        <Flex width={'12%'} p={2} py={3} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} bg={'grey'} alignItems={'center'}>
                            Indetification Number
                        </Flex>
                        <Flex width={'4%'} p={2} py={3} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} bg={'grey'} alignItems={'center'} justifyContent={'center'}>
                            QTY
                        </Flex>
                        <Flex width={'20%'} p={2} py={3} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} bg={'grey'} alignItems={'center'} justifyContent={'center'}>
                            Description
                        </Flex>
                        <Flex width={'5%'} p={2} py={3} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} bg={'grey'} alignItems={'center'} textAlign={'center'}>
                            WLL or SWL
                        </Flex>
                        <Flex width={'9%'} p={2} py={3} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} bg={'grey'} alignItems={'center'} textAlign={'center'}>
                            Date of Last Thorough Examination
                        </Flex>
                        <Flex width={'9%'} p={2} py={3} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} bg={'grey'} alignItems={'center'} textAlign={'center'}>
                            Date of this Thorough Examination
                        </Flex>
                        <Flex width={'9%'} p={2} py={3} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} bg={'grey'} alignItems={'center'} textAlign={'center'}>
                            Latest date of the next Thorough Examination
                        </Flex>
                        <Flex width={'10%'} p={2} py={3} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} bg={'grey'} alignItems={'center'} textAlign={'center'}>
                            Reason for examination (See Below)
                        </Flex>
                        <Flex width={'8%'} p={2} py={3} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} bg={'grey'} alignItems={'center'} textAlign={'center'}>
                            Detaill of any test
                        </Flex>
                        <Flex width={'8%'} p={2} py={3} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} bg={'grey'} alignItems={'center'} textAlign={'center'}>
                            Status (See Above)
                        </Flex>
                        <Flex width={'6%'} p={2} py={3} fontWeight={700} fontSize={13} bg={'grey'} alignItems={'center'} textAlign={'center'}>
                            Safe to Use Yes or No
                        </Flex>
                    </Flex>
                    <Flex sx={{ borderRight: '1px solid black', borderLeft: '1px solid black', borderBlockEnd: 'solid' }} flexDirection={'row'} height={'75mm'}>
                        <Flex width={'12%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'}>
                            {props.edit ? (
                                <Input value={identificationNumber} onChange={(event) => setIdentificationNumber(event.target.value)} />
                            ) : (
                                <>
                                    {props.identificationNumber ? props.identificationNumber : "......"}
                                </>
                            )}
                        </Flex>
                        <Flex width={'4%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'} justifyContent={'center'}>
                            {props.edit ? (
                                <Input value={qty} onChange={(event) => setQty(event.target.value)} />
                            ) : (
                                <>
                                    {props.qty ? props.qty : "......"}
                                </>
                            )}
                        </Flex>
                        <Flex width={'20%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'} justifyContent={'center'}>
                            {props.edit ? (
                                <Input as={'textarea'} value={description} onChange={(event) => setDescription(event.target.value)} />
                            ) : (
                                <>
                                    {props.description ? props.description : "......"}
                                </>
                            )}
                        </Flex>
                        <Flex width={'5%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'} textAlign={'center'}>
                            {props.edit ? (
                                <Input value={WLLorSWL} onChange={(event) => setWLLorSWL(event.target.value)} />
                            ) : (
                                <>
                                    {props.WLLorSWL ? props.WLLorSWL : "......"}
                                </>
                            )}
                        </Flex>
                        <Flex width={'9%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'} textAlign={'center'}>
                            {props.edit ? (
                                <Input value={dateofLastThoroughExamination} onChange={(event) => setDateofLastThoroughExamination(event.target.value)} />
                            ) : (
                                <>
                                    {props.dateofLastThoroughExamination ? props.dateofLastThoroughExamination : "......"}
                                </>
                            )}
                        </Flex>
                        <Flex width={'9%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'} textAlign={'center'}>
                            {props.edit ? (
                                <Input value={dateOfThisThoroughExamination} onChange={(event) => setDateOfThisThoroughExamination(event.target.value)} />
                            ) : (
                                <>
                                    {props.dateOfThisThoroughExamination ? props.dateOfThisThoroughExamination : "......"}
                                </>
                            )}
                        </Flex>
                        <Flex width={'9%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'} textAlign={'center'}>
                            {props.edit ? (
                                <Input value={latestDateOfTheNextThoroughExamination} onChange={(event) => setLatestDateOfTheNextThoroughExamination(event.target.value)} />
                            ) : (
                                <>
                                    {props.latestDateOfTheNextThoroughExamination ? props.latestDateOfTheNextThoroughExamination : "......"}
                                </>
                            )}
                        </Flex>
                        <Flex width={'10%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'} textAlign={'center'}>
                            {props.edit ? (
                                <Input value={reasonForExamination} onChange={(event) => setReasonForExamination(event.target.value)} />
                            ) : (
                                <>
                                    {props.reasonForExamination ? props.reasonForExamination : "......"}
                                </>
                            )}
                        </Flex>
                        <Flex width={'8%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'} textAlign={'center'}>
                            {props.edit ? (
                                <Input value={detaillOfAnyTest} onChange={(event) => setDetaillOfAnyTest(event.target.value)} />
                            ) : (
                                <>
                                    {props.detaillOfAnyTest ? props.detaillOfAnyTest : "......"}
                                </>
                            )}
                        </Flex>
                        <Flex width={'8%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'} textAlign={'center'}>
                            {props.edit ? (
                                <Input value={certificationStatus} onChange={(event) => setCertificationStatus(event.target.value)} />
                            ) : (
                                <>
                                    {props.certificationStatus ? props.certificationStatus : "......"}
                                </>
                            )}
                        </Flex>
                        <Flex width={'6%'} p={2} fontWeight={700} fontSize={13} alignItems={'center'} textAlign={'center'}>
                            {props.edit ? (
                                <Input value={safeToUseYesOrNo} onChange={(event) => setSafeToUseYesOrNo(event.target.value)} />
                            ) : (
                                <>
                                    {props.safeToUseYesOrNo ? props.safeToUseYesOrNo : "......"}
                                </>
                            )}
                        </Flex>
                    </Flex>
                    <Flex sx={{ borderRight: '1px solid black', borderLeft: '1px solid black', borderBlockEnd: 'solid' }} flexDirection={'row'}>
                        <Box width={'100%'} p={1} fontSize={'12px'} fontWeight={700}>
                            <Text as={'li'}>Result of Visual Examination: SATISFACTORY</Text>
                            <Text as={'li'}>Upon satisfactory resull of test and Visual Examination, the above-mentioned item was found satisfactory at the time of Inspection</Text>
                            <Text as={'li'}>This certificate will remain valid as long as no modification or repair performed, and shall not be longer than the mentioned dates above.</Text>
                        </Box>
                    </Flex>
                    <Flex sx={{ borderRight: '1px solid black', borderLeft: '1px solid black', borderBlockEnd: 'solid' }} flexDirection={'row'}>
                        <Flex width={'13%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={15} alignItems={'center'} justifyContent={'center'}>
                            Reason for Examination
                        </Flex>
                        <Flex width={'27%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'} justifyContent={'left'}>
                            Instalation:
                            {props.edit ? (
                                <Input width={100} ml={2} value={instalation} onChange={(event) => setInstalation(event.target.value)} />
                            ) : (
                                <strong>
                                    {props.instalation ? props.instalation : "......"}
                                </strong>
                            )}
                        </Flex>
                        <Flex width={'10%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'} justifyContent={'center'}>
                            6 Montly:
                            {props.edit ? (
                                <Input width={100} ml={2} value={sixMontly} onChange={(event) => setSixMontly(event.target.value)} />
                            ) : (
                                <strong>
                                    {props.sixMontly ? props.sixMontly : "......"}
                                </strong>
                            )}
                        </Flex>
                        <Flex width={'17%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'} justifyContent={'center'}>
                            12 Montly:
                            {props.edit ? (
                                <Input width={100} ml={2} value={twelveMontly} onChange={(event) => setTwelveMontly(event.target.value)} />
                            ) : (
                                <strong>
                                    {props.twelveMontly ? props.twelveMontly : "......"}
                                </strong>
                            )}
                        </Flex>
                        <Flex width={'17%'} p={2} sx={{ borderRight: 'solid' }} fontWeight={700} fontSize={13} alignItems={'center'} justifyContent={'center'}>
                            Written Scheme:
                            {props.edit ? (
                                <Input ml={2} value={writtenScheme} onChange={(event) => setWrittenScheme(event.target.value)} />
                            ) : (
                                <strong>
                                    {props.writtenScheme ? props.writtenScheme : "......"}
                                </strong>
                            )}
                        </Flex>
                        <Flex width={'14%'} p={2} fontWeight={700} fontSize={13} alignItems={'center'} justifyContent={'center'}>
                            Exceptional Circumstance:
                            {props.edit ? (
                                <Input ml={2} value={exceptionalCircumstance} onChange={(event) => setExceptionalCircumstance(event.target.value)} />
                            ) : (
                                <strong>
                                    {props.exceptionalCircumstance ? props.exceptionalCircumstance : "......"}
                                </strong>
                            )}
                        </Flex>
                    </Flex>
                    <Flex sx={{ borderRight: '1px solid black', borderLeft: '1px solid black', borderBlockEnd: 'solid' }} flexDirection={'row'}>
                        Need a meeting
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
            )}
        </Flex >
    );
};

export default Certification0;

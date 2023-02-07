import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";
import { Box, Image, Flex, Button, Text } from "rebass";
import { Input } from "@rebass/forms";

interface Certification0Type {
    equipmentNo?: string,
    equipmentSNo?: string,
    equipmentType?: string,
    inspectedBy?: string,
    inspectionDate?: string,
    nextInspectionDate?: string,
    stickerNo?: string;
    edit?: true;
    link?: string;
    certificateID?: string;
}

const Certification0 = ({ ...props }: Certification0Type) => {

    const canvasRef = useRef();

    const [stickerNo, setStickerNo] = useState<string>();
    const [equipmentNo, setEquipmentNo] = useState<string>();
    const [equipmentSNo, setEquipmentSNo] = useState<string>();
    const [equipmentType, setEquipmentType] = useState<string>();
    const [inspectedBy, setInspectedBy] = useState<string>();
    const [inspectionDate, setInspectionDate] = useState<string>();
    const [nextInspectionDate, setNextInspectionDate] = useState<string>();

    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [one, setOne] = useState<boolean>(false);

    useEffect(() => {
        if (props.edit && !one) {
            setStickerNo(props.stickerNo);
            setEquipmentNo(props.equipmentNo);
            setEquipmentSNo(props.equipmentSNo);
            setEquipmentType(props.equipmentType);
            setInspectedBy(props.inspectedBy);
            setInspectionDate(props.inspectionDate);
            setNextInspectionDate(props.nextInspectionDate);
            setOne(true);
        }

        QRCode.toCanvas(
            canvasRef.current,
            // @ts-ignore
            process.env.NEXT_PUBLIC_URL + props.link || process.env.NEXT_PUBLIC_URL + "/",
            (error: any) => error && console.error(error)
        );
    }, [props.link]);


    const saveData = async () => {
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
                    equipmentType: equipmentType,
                    equipmentNo: equipmentNo,
                    equipmentSNo: equipmentSNo,
                    inspectionDate: inspectionDate,
                    nextInspectionDate: nextInspectionDate,
                    inspectedBy: inspectedBy,
                },
            }),

        });
        const res: any = await response.json();
        console.log(res);

        if (res.success) {
            setSuccess(true);
            setError(false);
        } else {
            setSuccess(false);
            setError(true);
        }

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
                <Flex width={'25%'} alignItems={'center'} sx={{
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
                    <Box width={'50%'} fontSize={'22px'} fontWeight={800}>
                        Sticker No.
                    </Box>
                    <Box width={'50%'} fontWeight={600}>
                        {props.edit ? (
                            <Input value={stickerNo} onChange={(event) => setStickerNo(event.target.value)} />
                        ) : (
                            <>
                                {props.stickerNo ? props.stickerNo : ":......................................................."}
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
                    <Box width={'50%'} fontSize={'22px'} fontWeight={800}>
                        Equipment Type
                    </Box>
                    <Box width={'50%'} fontWeight={600}>
                        {props.edit ? (
                            <Input value={equipmentType} onChange={(event) => setEquipmentType(event.target.value)} />
                        ) : (
                            <>
                                {props.equipmentType ? props.equipmentType : ":......................................................."}
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
                    <Box width={'50%'} fontSize={'22px'} fontWeight={800}>
                        Equipment No.
                    </Box>
                    <Box width={'50%'} fontWeight={600}>
                        {props.edit ? (
                            <Input value={equipmentNo} onChange={(event) => setEquipmentNo(event.target.value)} />
                        ) : (
                            <>
                                {props.equipmentNo ? props.equipmentNo : ":......................................................."}
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
                    <Box width={'50%'} fontSize={'22px'} fontWeight={800}>
                        Equipment S.No.
                    </Box>
                    <Box width={'50%'} fontWeight={600}>
                        {props.edit ? (
                            <Input value={equipmentSNo} onChange={(event) => setEquipmentSNo(event.target.value)} />
                        ) : (
                            <>
                                {props.equipmentSNo ? props.equipmentSNo : ":......................................................."}
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
                    <Box width={'50%'} fontSize={'22px'} fontWeight={800}>
                        Inspection Date
                    </Box>
                    <Box width={'50%'} fontWeight={600}>
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
                    <Box width={'50%'} fontSize={'22px'} fontWeight={800}>
                        Next Inspection Date
                    </Box>
                    <Box width={'50%'} fontWeight={600}>
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
                    <Box width={'50%'} fontSize={'22px'} fontWeight={800}>
                        Inspected By
                    </Box>
                    <Box width={'50%'} fontWeight={600}>
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

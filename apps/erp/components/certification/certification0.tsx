import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";
import { Box, Image, Flex } from "rebass";
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
}

const Certification0 = ({ ...props }: Certification0Type) => {

    const canvasRef = useRef();

    useEffect(() => {
        QRCode.toCanvas(
            canvasRef.current,
            // @ts-ignore
            process.env.NEXT_PUBLIC_URL + props.link || process.env.NEXT_PUBLIC_URL + "/",
            (error: any) => error && console.error(error)
        );
    }, [props.link]);


    return (
        <Flex flexDirection={'column'} width={'50%'} backgroundColor={'white'} p={3} sx={{
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
                <Flex width={'25%'} alignItems={'center'} sx={{
                    "@media (max-width: 960px)": {
                        width: '100%',
                    }
                }}>
                    <Image src="/static/images/logo/logo-transparent.webp" width={'100%'} alt={'logo'} />
                </Flex>
                <Flex width={'50%'} fontWeight={700} alignItems={'center'} justifyContent={'center'} sx={{
                    "@media (max-width: 960px)": {
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
                            <Input value={props.stickerNo} />
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
                            <Input value={props.equipmentType} />
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
                            <Input value={props.equipmentNo} />
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
                            <Input value={props.equipmentSNo} />
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
                            <Input value={props.inspectionDate} />
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
                            <Input value={props.nextInspectionDate} />
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
                            <Input value={props.inspectedBy} />
                        ) : (
                            <>
                                {props.inspectedBy ? props.inspectedBy : ":......................................................."}
                            </>
                        )}
                    </Box>
                </Flex>
            </Flex>
        </Flex >
    );
};

export default Certification0;

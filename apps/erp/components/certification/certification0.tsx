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
            props.link || process.env.NEXT_PUBLIC_URL + "/",
            (error: any) => error && console.error(error)
        );
    }, [props.link]);


    return (
        <Flex flexDirection={'column'} width={'50%'} backgroundColor={'white'} p={3} sx={{
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}>
            <Flex flexDirection={'row'} py={1}>
                <Flex width={'25%'} alignItems={'center'}>
                    <Image src="/static/images/logo/logo-transparent.webp" width={'100%'} alt={'logo'} />
                </Flex>
                <Flex width={'50%'} fontWeight={700} alignItems={'center'} justifyContent={'center'}>
                    TUV Rheinland Arabia LLC, <br />
                    PO BOX 11488, Jeddah 21453, KSA <br />
                    Tel No.: +966(12) 6019230 <br />
                    +966(13) 8664906 <br />
                    Email: IS-lifting@sa.tuv.om <br />
                </Flex>
                <Flex width={'25%'} alignItems={'center'}>
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
                <Flex width={'100%'} alignItems={'center'} my={2}>
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
                <Flex width={'100%'} alignItems={'center'} my={2}>
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
                <Flex width={'100%'} alignItems={'center'} my={2}>
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
                <Flex width={'100%'} alignItems={'center'} my={2}>
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
                <Flex width={'100%'} alignItems={'center'} my={2}>
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
                <Flex width={'100%'} alignItems={'center'} my={2}>
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
                <Flex width={'100%'} alignItems={'center'} my={2}>
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

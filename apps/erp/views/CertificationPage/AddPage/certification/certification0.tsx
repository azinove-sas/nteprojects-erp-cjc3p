import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";
import { Box, Image, Flex } from "rebass";


interface Certification0Type { }

const Certification0 = ({ ...props }: Certification0Type) => {

    const [text, setText] = useState("");
    const canvasRef = useRef();

    useEffect(() => {
        QRCode.toCanvas(
            canvasRef.current,
            // QR code doesn't work with an empty string
            // so we are using a blank space as a fallback
            text || process.env.NEXT_PUBLIC_URL + "/shared/demos",
            (error: any) => error && console.error(error)
        );
    }, [text]);


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
                        :.......................................................
                    </Box>
                </Flex>
                <Flex width={'100%'} alignItems={'center'} my={2}>
                    <Box width={'50%'} fontSize={'22px'} fontWeight={800}>
                        Equipment Name
                    </Box>
                    <Box width={'50%'} fontWeight={600}>
                        :.......................................................
                    </Box>
                </Flex>
                <Flex width={'100%'} alignItems={'center'} my={2}>
                    <Box width={'50%'} fontSize={'22px'} fontWeight={800}>
                        Equipment No.
                    </Box>
                    <Box width={'50%'} fontWeight={600}>
                        :.......................................................
                    </Box>
                </Flex>
                <Flex width={'100%'} alignItems={'center'} my={2}>
                    <Box width={'50%'} fontSize={'22px'} fontWeight={800}>
                        Equipment S.No.
                    </Box>
                    <Box width={'50%'} fontWeight={600}>
                        :.......................................................
                    </Box>
                </Flex>
                <Flex width={'100%'} alignItems={'center'} my={2}>
                    <Box width={'50%'} fontSize={'22px'} fontWeight={800}>
                        Inspection Date
                    </Box>
                    <Box width={'50%'} fontWeight={600}>
                        :.......................................................
                    </Box>
                </Flex>
                <Flex width={'100%'} alignItems={'center'} my={2}>
                    <Box width={'50%'} fontSize={'22px'} fontWeight={800}>
                        Next Inspection Date
                    </Box>
                    <Box width={'50%'} fontWeight={600}>
                        :.......................................................
                    </Box>
                </Flex>
                <Flex width={'100%'} alignItems={'center'} my={2}>
                    <Box width={'50%'} fontSize={'22px'} fontWeight={800}>
                        Inspected By
                    </Box>
                    <Box width={'50%'} fontWeight={600}>
                        :.......................................................
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Certification0;

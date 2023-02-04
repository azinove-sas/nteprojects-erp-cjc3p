import React, { useState } from "react";
import Content from "@views/common/content";
import { Flex, Box, Text, Image } from "rebass";
import { useSession } from "next-auth/react";
import useAccount from "@utils/useAccount";
import { tabsList } from "./constant";

interface SettingPageType { }

const SettingPage = ({ ...props }: SettingPageType) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const { data: session } = useSession();

    // @ts-ignore
    const { data: data, isLoading } = useAccount(session?.user?.id);


    if (isLoading) return <Text as={"p"}>Loading...</Text>;

    return (
        <Content>
            <Flex
                sx={{
                    p: 0,
                    flexWrap: "wrap",
                    flex: "1 1 auto",
                    margin: "-12px",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        padding: "12px",
                        flex: "0 0 100%",
                        maxWidth: "100%",
                        "@media (min-width: 960px)": {
                            flex: "0 0 41.6666666667%",
                            maxWidth: "41.6666666667%",
                        },
                        "@media (min-width: 1280px)": {
                            flex: "0 0 33.3333333333%",
                            maxWidth: "33.3333333333%",
                        },
                    }}
                >
                    <Flex
                        sx={{
                            flexWrap: "wrap",
                            flex: "1 1 auto",
                            margin: "-12px",
                        }}
                    >
                        <Box
                            sx={{
                                flex: "0 0 100%",
                                maxWidth: "100%",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "block",
                                    overflow: "hidden",
                                    overflowWrap: "break-word",
                                    position: "relative",
                                    padding: "0",
                                    textDecoration: "none",
                                    transitionDuration: ".28s",
                                    transitionProperty: "box-shadow,opacity",
                                    transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
                                    zIndex: "0",
                                    borderStyle: "solid",
                                    borderWidth: "0",
                                    borderRadius: "6px",
                                    boxShadow: `0 5px 11px 3px rgba(51,48,60, 0.03),0 11px 8px 1px rgba(51,48,60, 0.02),0 3px 8px 4px rgba(51,48,60, 0.01)`,
                                    background: "rgb(255, 255, 255)",
                                    color: "rgba(51,48,60,0.68)",
                                }}
                            >
                                <Box sx={{
                                    flex: '1 1 auto',
                                    fontSize: '1rem',
                                    fontWeight: '400',
                                    letterSpacing: '.0178571429em',
                                    padding: '24px',
                                    textTransform: 'none',
                                    lineHeight: '1.5',
                                    textAlign: 'center!important',
                                    pt: '60px!important'
                                }}>
                                    <Box
                                        sx={{
                                            flex: 'none',
                                            alignItems: 'center',
                                            display: 'inline-flex',
                                            justifyContent: 'center',
                                            lineHeight: 'normal',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            textAlign: 'center',
                                            transition: '.2s cubic-bezier(.4,0,.2,1)',
                                            transitionProperty: 'width,height',
                                            verticalAlign: 'middle',
                                            width: '120px',
                                            height: '120px',
                                        }}
                                    >
                                        <Image
                                            src={data.image}
                                            alt=""
                                        />
                                    </Box>
                                    <Text as={'h6'} sx={{
                                        my: '16px!important',
                                        color: 'black',
                                        fontSize: '1.25rem!important',
                                        fontWeight: '500',
                                        lineHeight: '1.5rem',
                                        letterSpacing: '.0125em!important',
                                        fontFamily: 'Public Sans,sans-serif,-apple-system,blinkmacsystemfont,Segoe UI,roboto,Helvetica Neue,arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol!important',
                                        textTransform: 'none!important',
                                    }}>
                                        {data.name}
                                    </Text>
                                    <Text as={'span'}
                                        sx={{
                                            textTransform: 'capitalize!important',
                                            height: '26px',
                                            fontSize: '.8125rem',
                                            padding: '0 10px',
                                            alignItems: 'center',
                                            display: 'inline-flex',
                                            fontWeight: '400',
                                            maxWidth: '100%',
                                            borderRadius: '0.25rem',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            textDecoration: 'none',
                                            whiteSpace: 'nowrap',
                                            verticalAlign: 'middle',
                                        }}

                                    >
                                        <Text as={'span'} sx={{
                                            background: 'currentColor',
                                            opacity: 0.12,
                                            borderRadius: 'inherit',
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            left: 0,
                                            pointerEvents: 'none',
                                        }} />
                                        {data.role == 0 && (
                                            <>User</>
                                        )}
                                        {data.role == 1 && (
                                            <>Admin</>
                                        )}
                                        {data.role == 2 && (
                                            <>Super Admin</>
                                        )}
                                    </Text>
                                </Box>
                                <Box as={'hr'} sx={{
                                    display: 'block',
                                    flex: '1 1 100%',
                                    height: '0px',
                                    maxHeight: '0px',
                                    transition: 'inherit',
                                    borderStyle: 'solid',
                                    borderWidth: 'thin 0 0 0',
                                }} />
                                <Box sx={{
                                    flex: '1 1 auto',
                                    fontSize: '1rem',
                                    fontWeight: '400',
                                    letterSpacing: '.0178571429em',
                                    padding: '24px',
                                    textTransform: 'none',
                                    lineHeight: '1.5',
                                }}>
                                    <Text as={'p'} sx={{
                                        fontSize: '.875rem',
                                        lineHeight: '1.25rem',
                                        marginBlockEnd: '1rem',
                                    }}>
                                        DETAILS
                                    </Text>
                                    <Box sx={{
                                        p: '16px',
                                        paddingBlock: '0!important',
                                        paddingInline: '0!important',
                                    }}>
                                        <Box sx={{
                                            hyphens: 'auto',
                                            overflow: 'hidden',
                                            padding: 0,
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            wordBreak: 'normal',
                                            wordWrap: 'break-word',
                                            fontSize: '1rem',
                                            fontWeight: '400',
                                            letterSpacing: '.009375em',
                                            lineHeight: '1.5rem',
                                            textTransform: 'none',
                                        }}>
                                            <Text as={'h6'} sx={{
                                                fontWeight: '600!important',
                                                fontSize: '1rem',
                                                lineHeight: '1.5rem',
                                            }}>
                                                Name:
                                                <Text as={'span'} ml={2} sx={{
                                                    fontSize: '.875rem!important',
                                                    fontWeight: '400',
                                                    lineHeight: '1.5',
                                                    letterSpacing: '.0178571429em!important',
                                                    fontFamily: 'Public Sans,sans-serif,-apple-system,blinkmacsystemfont,Segoe UI,roboto,Helvetica Neue,arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol!important',
                                                    textTransform: 'none!important',
                                                    color: "rgba(51,48,60,0.68)",
                                                }}>
                                                    {data.name}
                                                </Text>
                                            </Text>
                                        </Box>
                                        <Box sx={{
                                            hyphens: 'auto',
                                            overflow: 'hidden',
                                            padding: 0,
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            wordBreak: 'normal',
                                            wordWrap: 'break-word',
                                            fontSize: '1rem',
                                            fontWeight: '400',
                                            letterSpacing: '.009375em',
                                            lineHeight: '1.5rem',
                                            textTransform: 'none',
                                        }}>
                                            <Text as={'h6'} sx={{
                                                fontWeight: '600!important',
                                                fontSize: '1rem',
                                                lineHeight: '1.5rem',
                                            }}>
                                                Email:
                                                <Text as={'span'} ml={2} sx={{
                                                    fontSize: '.875rem!important',
                                                    fontWeight: '400',
                                                    lineHeight: '1.5',
                                                    letterSpacing: '.0178571429em!important',
                                                    fontFamily: 'Public Sans,sans-serif,-apple-system,blinkmacsystemfont,Segoe UI,roboto,Helvetica Neue,arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol!important',
                                                    textTransform: 'none!important',
                                                    color: "rgba(51,48,60,0.68)",
                                                }}>
                                                    {data.email}
                                                </Text>
                                            </Text>
                                        </Box>
                                        <Box sx={{
                                            hyphens: 'auto',
                                            overflow: 'hidden',
                                            padding: 0,
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            wordBreak: 'normal',
                                            wordWrap: 'break-word',
                                            fontSize: '1rem',
                                            fontWeight: '400',
                                            letterSpacing: '.009375em',
                                            lineHeight: '1.5rem',
                                            textTransform: 'none',
                                        }}>
                                            <Text as={'h6'} sx={{
                                                fontWeight: '600!important',
                                                fontSize: '1rem',
                                                lineHeight: '1.5rem',
                                            }}>
                                                Role:
                                                <Text as={'span'} ml={2} sx={{
                                                    fontSize: '.875rem!important',
                                                    fontWeight: '400',
                                                    lineHeight: '1.5',
                                                    letterSpacing: '.0178571429em!important',
                                                    fontFamily: 'Public Sans,sans-serif,-apple-system,blinkmacsystemfont,Segoe UI,roboto,Helvetica Neue,arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol!important',
                                                    textTransform: 'none!important',
                                                    color: "rgba(51,48,60,0.68)",
                                                }}>
                                                    {data.role == 0 && (
                                                        <>User</>
                                                    )}
                                                    {data.role == 1 && (
                                                        <>Admin</>
                                                    )}
                                                    {data.role == 2 && (
                                                        <>Super Admin</>
                                                    )}
                                                </Text>
                                            </Text>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        padding: "12px",
                        flex: "0 0 100%",
                        maxWidth: "100%",
                        "@media (min-width: 960px)": {
                            flex: "0 0 58.3333333333%",
                            maxWidth: "58.3333333333%",
                        },
                        "@media (min-width: 1280px)": {
                            flex: "0 0 66.6666666667%",
                            maxWidth: "66.6666666667%",
                        },
                    }}
                >
                    div
                </Box>
            </Flex>
        </Content>
    );
};

export default SettingPage;

import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Image } from "rebass";
import { getSession, signOut } from "next-auth/react";
import { menuItem } from "./menuItem";
import MenuItems from "./MenuItems";
import { BiExit, BiUser } from "react-icons/bi";

const Navbar = () => {
  const [userData, setUserData] = useState<any>();
  const [userDropdown, setUserDropdown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserData = async () => {
      const data = await getSession();
      setUserData(data);
      setIsLoading(false);
    };
    getUserData();
  }, []);

  console.log(userData);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <Box
          sx={{
            position: "sticky",
            insetBlockStart: 0,
            willChange: "transform",
            backgroundColor: "#ffffff",
            backdropFilter: "blur(6px)",
            boxShadow: `0 3px 3px -2px rgba(51,48,60, 0.03),0 3px 4px 0 rgba(51,48,60, 0.02),0 1px 8px 0 rgba(51,48,60, 0.01)`,
            zIndex: 1001,
          }}
        >
          <Box
            sx={{
              zIndex: "11",
              blockSize: "64px",
            }}
          >
            <Flex
              sx={{
                inlineSize: "100%",
                marginInline: "auto",
                maxInlineSize: "1440px",
                alignItems: "center",
                blockSize: "100%",
                paddingInline: "1.5rem",
                borderBlockEnd: "1px solid rgba(75, 70, 92,0.12)",
              }}
            >
              <Text
                as={"a"}
                href="/"
                sx={{
                  columnGap: "0.75rem",
                  alignItems: "center",
                  display: "flex",
                  textDecoration: "none",
                }}
              >
                <Text
                  as={"h1"}
                  sx={{
                    fontSize: "22px",
                    lineHeight: "normal!important",
                  }}
                >
                  <Image src="/static/images/nteprojects-logo.webp" height={50} />
                </Text>
              </Text>
              <Box sx={{ flexGrow: "1!important" }} />
              <Box
                sx={{
                  display: "inline-block",
                  lineHeight: "1",
                }}
              >
                <Flex sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      flex: "none",
                      alignItems: "center",
                      display: "inline-flex",
                      justifyContent: "center",
                      lineHeight: "normal",
                      overflow: "hidden",
                      position: "relative",
                      textAlign: "center",
                      transition: ".2s cubic-bezier(.4,0,.2,1)",
                      transitionProperty: "width,height",
                      verticalAlign: "middle",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      userDropdown ? setUserDropdown(false) : setUserDropdown(true)
                    }
                  >
                    <Image
                      src={userData && userData.user.image}
                      height={"40px"}
                      width={"40px"}
                      alt=""
                    />
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Box
            sx={{
              paddingBlock: ".6875rem",
              zIndex: "11",
            }}
          >
            <Box
              sx={{
                inlineSize: "100%",
                marginInline: "auto",
              }}
            >
              <Flex
                as={"ul"}
                sx={{
                  gap: "4px",
                  flexWrap: "wrap",
                  listStyle: "none",
                }}
              >
                {menuItem.map((menu: any, index: number) => {
                  const depthLevel = 0;

                  return (
                    <MenuItems items={menu} key={index} depthLevel={depthLevel} userRole={userData.user.role} />
                  );
                })}
              </Flex>
            </Box>
          </Box>
          {userDropdown && (

            <Flex sx={{
              zIndex: 2000,
              position: 'absolute',
              borderRadius: 'inherit',
              left: 0,
              pointerEvents: 'none',
              top: 0,
              bottom: 0,
              right: 0,
            }}>
              <Flex
                sx={{
                  maxHeight: '930px',
                  maxWidth: '1350px',
                  minWidth: '40px',
                  width: '230px',
                  '--v-overlay-anchor-origin': 'bottom right',
                  transformOrigin: 'right top',
                  top: '65.5px',
                  left: 'calc(100vw - 230px)',
                  flexDirection: 'column',
                  borderRadius: '6px',
                  outline: 'none',
                  position: 'absolute',
                  pointerEvents: 'auto',
                  contain: 'layout',
                }}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 'inherit',
                    overflow: 'auto',
                    height: '100%',
                    boxShadow: `0 5px 11px 3px rgba(51,48,60, 0.03),0 11px 8px 1px rgba(51,48,60, 0.02),0 3px 8px 4px rgba(51,48,60, 0.01)`,
                  }}
                  role="listbox"
                >
                  <Box sx={{
                    borderRadius: '0.375rem',
                    marginBlock: '0.25rem',
                    marginInline: "0.5rem",
                    minBlockSize: "2.25rem",
                    paddingInlineStart: "16px",
                    paddingInlineEnd: '16px',

                    alignItems: 'center',
                    display: "grid",
                    flex: 'none',
                    gridTemplateAreas: "prepend content append",
                    gridTemplateColumns: 'max-content auto max-content',
                    outline: 'none',
                    padding: '4px 16px',
                    position: 'relative',
                    textDecoration: 'none',
                  }}>
                    <Flex sx={{
                      marginInlineEnd: '12px',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                      <Image
                        src={userData && userData.user.image}
                        height={"40px"}
                        width={"40px"}
                        style={{
                          verticalAlign: "middle",
                          borderRadius: "50%",
                        }}
                        alt=""
                      />
                    </Flex>
                    <Box sx={{
                      alignSelf: 'center',
                    }}>
                      <Box sx={{
                        hyphens: 'auto',
                        overflowWrap: 'normal',
                        overflow: 'hidden',
                        padding: 0,
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        wordBreak: 'normal',
                        wordWrap: 'break-word',
                        fontSize: '1rem',
                        fontWeight: '600',
                        letterSpacing: '.009375em',
                        lineHeight: '1.5rem',
                        textTransform: 'none',
                      }}>
                        {userData && userData.user.name}
                      </Box>
                      <Box sx={{
                        display: '-webkit-box',
                        opacity: '0.68',
                        overflow: 'hidden',
                        padding: '0',
                        textOverflow: 'ellipsis',
                        fontSize: '.875rem',
                        fontWeight: '400',
                        letterSpacing: '.0178571429em',
                        lineHeight: '1rem',
                        textYransform: 'none',
                      }}>
                        {userData.user.role == 0 && (
                          <>User</>
                        )}
                        {userData.user.role == 1 && (
                          <>Admin</>
                        )}
                        {userData.user.role == 2 && (
                          <>Super Admin</>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box as={'hr'}
                    sx={{
                      display: 'block',
                      flex: '1 1 100%',
                      height: '0px',
                      maxHeight: '0px',
                      transition: 'inherit',
                      borderColor: 'rgba(75, 70, 92,0.12)',
                      borderStyle: 'solid',
                      borderWidth: 'thin 0 0 0',
                    }}
                    aria-orientation="horizontal"
                    role="separator"
                  />
                  <Text as={'a'}
                    sx={{
                      borderRadius: '0.375rem',
                      marginBlock: '0.25rem',
                      marginInline: "0.5rem",
                      minBlockSize: "2.25rem",
                      paddingInlineStart: "16px",
                      paddingInlineEnd: '16px',
                      alignItems: 'center',
                      display: "grid",
                      flex: 'none',
                      gridTemplateAreas: "prepend content append",
                      gridTemplateColumns: 'max-content auto max-content',
                      outline: 'none',
                      padding: '4px 16px',
                      position: 'relative',
                      textDecoration: 'none',
                    }}
                  >
                    <Box sx={{ opacity: 0.87 }} mr={2}>
                      <BiUser size={22} />
                    </Box>
                    <Box>
                      Profile
                    </Box>
                  </Text>
                  <Box as={'hr'}
                    sx={{
                      display: 'block',
                      flex: '1 1 100%',
                      height: '0px',
                      maxHeight: '0px',
                      transition: 'inherit',
                      borderColor: 'rgba(75, 70, 92,0.12)',
                      borderStyle: 'solid',
                      borderWidth: 'thin 0 0 0',
                    }}
                    aria-orientation="horizontal"
                    role="separator"
                  />
                  <Text as={"a"} onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/api/auth/logout` })}
                    sx={{
                      borderRadius: '0.375rem',
                      marginBlock: '0.25rem',
                      marginInline: "0.5rem",
                      minBlockSize: "2.25rem",
                      paddingInlineStart: "16px",
                      paddingInlineEnd: '16px',
                      alignItems: 'center',
                      display: "grid",
                      flex: 'none',
                      gridTemplateAreas: "prepend content append",
                      gridTemplateColumns: 'max-content auto max-content',
                      outline: 'none',
                      padding: '4px 16px',
                      position: 'relative',
                      textDecoration: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Box sx={{ opacity: 0.87, verticalAlign: 'middle' }} mr={2}>
                      <BiExit size={22} />
                    </Box>
                    <Box>
                      Logout
                    </Box>
                  </Text>
                </Box>
              </Flex>
            </Flex>
          )}
        </Box>
      )}
    </>
  );
};

export default Navbar;

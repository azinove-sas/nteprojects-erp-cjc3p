import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Image } from "rebass";
import { getSession } from "next-auth/react";
import { menuItem } from "./menuItem";
import MenuItems from "./MenuItems";


const Navbar = () => {
  const [userData, setUserData] = useState<any>();
  // const [userDropdown, setUserDropdown] = useState<boolean>(false);

  useEffect(() => {
    const getUserData = async () => {
      const data = await getSession();
      setUserData(data);
    };

    getUserData();
  }, []);

  return (
    <>
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
                  <MenuItems items={menu} key={index} depthLevel={depthLevel} />
                );
              })}
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;

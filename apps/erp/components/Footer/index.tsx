import React from "react";
import { Flex, Text } from "rebass";
import Link from "next/link";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <Flex justifyContent="center" sx={{ borderTop: "1px solid grey" }}>
        <Link
          target="_blank"
          href="https://azinove.com/"
          passHref
          style={{ textDecoration: "none" }}
        >
          <Flex flexDirection={"column"} alignItems={"center"} my={3}>
            <Image
              src="/static/images/azinove/azinove-brand.webp"
              height={11}
              width={70}
              alt="azinove.com brand"
            />
            <Text
              display={"flex"}
              alignItems="center"
              as={"p"}
              fontWeight={500}
              color="black"
            >
              Created with <AiFillHeart style={{ margin: "2px" }} color="red" />{" "}
              by Azinove
            </Text>
          </Flex>
        </Link>
      </Flex>
    </>
  );
};

export default Footer;

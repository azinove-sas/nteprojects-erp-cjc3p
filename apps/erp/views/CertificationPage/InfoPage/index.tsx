import React from "react";
import Content from "@views/common/content";
import { Flex, Text } from "rebass";
import Certification0 from "@components/certification/certification0";

interface InfoPageType {
    data: any;
}

const InfoPage = ({ ...props }: InfoPageType) => {

    console.log(props.data);
    return (
        <Content>
            <Flex textAlign={'center'} flexDirection={'column'} my={3}>
                <Text as={'h2'}>Inspector: {props.data.selectedUser}</Text>
                <Text as={'h2'}>Link: {process.env.NEXT_PUBLIC_URL + props.data.sharedLink}</Text>
            </Flex>
            <Flex justifyContent={'center'} my={3}>
                <Certification0 {...props?.data.certificateInfo} link={props.data.sharedLink} edit />
            </Flex>
        </Content>
    );
};

export default InfoPage;

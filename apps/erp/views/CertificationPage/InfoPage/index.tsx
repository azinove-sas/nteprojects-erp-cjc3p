import React from "react";
import Content from "@views/common/content";
import { Flex } from "rebass";
import { certificationIndex } from "@components/certification/certificationIndex";
import Certification0 from "@components/certification/certification0";

interface InfoPageType {
    data: any;
}

const InfoPage = ({ ...props }: InfoPageType) => {

    return (
        <Content>
            <Flex justifyContent={'center'} my={3}>
                <Certification0 {...props?.data.certificateInfo} link={props.data.sharedLink} edit />
            </Flex>
        </Content>
    );
};

export default InfoPage;

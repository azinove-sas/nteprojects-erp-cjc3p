import React from "react";
import Content from "@views/common/content";
import { Flex } from "rebass";
import Certification0 from "@components/certification/certification0";

interface CertificationPageType {
  data: any;
}

const CertificationPage = ({ ...props }: CertificationPageType) => {
  return (
    <Content>
      <Flex justifyContent={'center'} my={3}>
        <Certification0 {...props?.data.certificateInfo} certificateStatus={props.data.certificateStatus} link={props.data.sharedLink} />
      </Flex>
    </Content>
  );
};

export default CertificationPage;

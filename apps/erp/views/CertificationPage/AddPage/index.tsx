import React, { useEffect, useState } from "react";
import Content from "@views/common/content";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Text, Flex } from "rebass";
import { Label, Select, Input } from '@rebass/forms'
import useAdminUserList from "@utils/useAdminUserList";
import { CERTIFICAT } from "@constant/certificateList";
import { certificationIndex } from "./certificationIndex";


interface AddPageType { }

const AddPage = ({ ...props }: AddPageType) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [selectedCertificate, setSelectedCertificate] = useState<number>(0);

  const { data: data, isLoading } = useAdminUserList();

  // @ts-ignore
  if (session?.user?.role < 1) {
    router.push("/");
  }

  if (isLoading) return <Text as={"p"}>Loading...</Text>;

  return (
    <Content>
      <Box>
        <Label fontSize={20} my={2} htmlFor='certificate'>Certificate Type</Label>
        <Select
          id='certificate'
          name='certificate'
          bg={'white'}
          defaultValue='Please Select'>
          {CERTIFICAT.map((item, key) => (
            <option
              key={key}>
              {item.ID} | {item.name}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Label fontSize={20} my={2} htmlFor='user'>Select User</Label>
        <Select
          id='user'
          name='user'
          bg={'white'}
          defaultValue='Please Select'>
          {Object.entries(data).map(([key, item]: any) => (
            <option
              key={key}>
              {item.email} | {item.name}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Label fontSize={20} my={2} htmlFor='number'>Number Of Certificate</Label>
        <Input
          id='number'
          name='number'
          type='number'
          bg={'white'}
          placeholder='1'
          defaultValue='1'
        />
      </Box>

      <Flex mt={4}>
        <Box width={'100%'}>
          <Label justifyContent={'center'} fontSize={20} my={2} htmlFor='number'>Exemple of the selected Certificat:</Label>
          <Label justifyContent={'center'} fontSize={20} fontWeight={600} my={2} htmlFor='certificateName'>{CERTIFICAT.at(selectedCertificate)?.name}</Label>
        </Box>
      </Flex>
      <Flex justifyContent={'center'} my={3}>
        {certificationIndex.at(selectedCertificate)?.children}
      </Flex>
    </Content>
  );
};

export default AddPage;

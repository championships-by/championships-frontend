import React from "react";
import { Flex } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

function ParticipantLink({ children }) {
  return (
    <Flex gap="middle" justify="space-between">
      {children}
      <ArrowRightOutlined />
    </Flex>
  );
}

export default ParticipantLink;

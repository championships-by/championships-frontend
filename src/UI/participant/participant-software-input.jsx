import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Typography } from "antd";
import { CodeOutlined } from "@ant-design/icons";

function ParticipantSoftwareInput({ name }) {
  return (
    <FormItem name={name}>
      <Flex vertical>
        <Typography.Text>Программное обеспечение</Typography.Text>
        <Input
          prefix={<CodeOutlined />}
          placeholder="Введите программное обеспечение участника"
          id="participant_software_input"
        />
        <Typography.Text type="secondary">
          Пример: PyCharm, VsCode;
        </Typography.Text>
      </Flex>
    </FormItem>
  );
}
export default ParticipantSoftwareInput;

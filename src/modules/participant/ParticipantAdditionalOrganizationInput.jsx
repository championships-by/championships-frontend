import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Typography } from "antd";
import { BankOutlined } from "@ant-design/icons";

function ParticipantAdditionalOrganiztionInput({ name, value }) {
  return (
    <FormItem name={name}>
      <Flex vertical>
        <Typography.Text>
          Учреждение дополнительного образования
        </Typography.Text>
        <Input
          prefix={<BankOutlined />}
          placeholder="Введите учреждение дополнительного образования"
          id="participant_additionalorganization_input"
          value={value}
        />
        <Typography.Text type="secondary">
          Пример: ГУО "Центр дополнительного образования"
        </Typography.Text>
      </Flex>
    </FormItem>
  );
}
export default ParticipantAdditionalOrganiztionInput;

import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Typography } from "antd";
import { LaptopOutlined } from "@ant-design/icons";

function ParticipantEquipmentInput({ name }) {
  return (
    <FormItem name={name}>
      <Flex vertical>
        <Typography.Text>Привозимое оборудование участника</Typography.Text>
        <Input
          prefix={<LaptopOutlined />}
          placeholder="Введите привозимое оборудование участника"
          id="participant_equipment_input"
        />
        <Typography.Text type="secondary">
          Пример: Набор лего для робототехники;
        </Typography.Text>
      </Flex>
    </FormItem>
  );
}
export default ParticipantEquipmentInput;

import React from "react";
import { Flex, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

const rules = [
  {
    pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
    message: "Отчество может содержать только буквы",
  },
  {
    min: 3,
    message: "Минимум 3 символа",
  },
  {
    max: 255,
    message: "Максимальное значение 255",
  },
];

function ParticipantPatronymicInput({ name, value }) {
  return (
    <FormItem name={name} hasFeedback validateFirst rules={rules}>
      <Flex vertical>
        <Typography.Text>Отчество (если таковое имеется)</Typography.Text>
        <Input
          prefix={<UserOutlined />}
          allowClear
          placeholder="Введите отчество"
          maxLength={255}
          value={value}
        />
        <Typography.Text type="secondary">Пример: Иванович</Typography.Text>
      </Flex>
    </FormItem>
  );
}

export default ParticipantPatronymicInput;

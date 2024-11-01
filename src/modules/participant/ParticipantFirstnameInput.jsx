import React from "react";
import { Flex, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

function ParticipantFirstnameInput({ name, value }) {
  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: "Пожалуйста введите имя",
        },
        {
          pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
          message: "Имя может содержать только буквы",
        },
        {
          min: 3,
          message: "Минимум 3 символа",
        },
        {
          max: 255,
          message: "Максимальное значение 255",
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>Имя</Typography.Text>
        <Input
          allowClear
          prefix={<UserOutlined />}
          placeholder="Введите имя"
          maxLength={255}
          id="participant_fname_input"
          value={value}
        />
        <Typography.Text type="secondary">Пример: Иван</Typography.Text>
      </Flex>
    </FormItem>
  );
}

export default ParticipantFirstnameInput;

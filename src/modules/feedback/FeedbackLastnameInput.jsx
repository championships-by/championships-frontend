import React from "react";
import { Flex, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

import "./sass/feedback.scss";

function FeedbackLastnameInput({ name }) {
  const rules = [
    {
      required: true,
      whitespace: true,
      message: "Пожалуйста, введите фамилию",
    },
    {
      max: 255,
      message: "Максимальное значение 255",
    },
  ];

  return (
    <Flex vertical className="user__lastname-input__flex">
      <Typography.Text>Фамилия*</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        shouldUpdate
        rules={rules}
        className="user__lastname-input__formitem"
      >
        <Input
          prefix={<UserOutlined />}
          allowClear
          placeholder="Введите фамилию"
          maxLength={255}
        />
      </FormItem>
      <Typography.Text type="secondary">Пример: Иванов</Typography.Text>
    </Flex>
  );
}

export default FeedbackLastnameInput;

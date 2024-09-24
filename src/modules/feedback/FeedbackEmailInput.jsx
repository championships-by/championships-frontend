import React from "react";
import { Flex, Input, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

import "./sass/feedback.scss";

const rules = [
  {
    required: true,
    message: "Пожалуйста, введите Email",
  },
  {
    type: "email",
    whitespace: true,
    message: "Некоректный Email",
  },
];

function FeedbackEmailInput({ name }) {
  return (
    <Flex vertical className="user__email-input__flex">
      <Typography.Text>Email*</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        shouldUpdate
        rules={rules}
        className="user__email-input__formitem"
      >
        <Input
          prefix={<MailOutlined />}
          type="email"
          placeholder="Введите Email"
        />
      </FormItem>
      <Typography.Text type="secondary">
        Пример: example@example.com
      </Typography.Text>
    </Flex>
  );
}

export default FeedbackEmailInput;

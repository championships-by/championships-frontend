import React, { useCallback } from "react";
import { Flex, Input, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import "./sass/user.scss";

function UserEmailInput({ name }) {
  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <Flex vertical className="user__email-input__flex">
      <Typography.Text>Email</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        shouldUpdate
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите Email",
          },
          {
            type: "email",
            message: "Некоректный Email",
          },
        ]}
        className="user__email-input__formitem"
      >
        <Input
          prefix={<MailOutlined />}
          type="email"
          placeholder="Введите Email"
          onKeyPress={handleKeyPress}
        />
      </FormItem>
      <Typography.Text type="secondary">
        Пример: example@example.com
      </Typography.Text>
    </Flex>
  );
}

export default UserEmailInput;

import React, { useCallback } from "react";
import { Flex, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import "./sass/user.scss";
import { handlePaste } from "@utils";

function UserFirstnameInput({ name }) {
  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <Flex vertical className="user__firstname-input__flex">
      <Typography.Text>Имя</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите имя",
          },
          {
            max: 255,
            message: "Максимальное значение 255",
          },
          {
            validator(_, value) {
              if (value && value.trim()) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Пожалуйста, введите корректное имя")
              );
            },
          },
        ]}
        className="user__firstname-input__formitem"
      >
        <Input
          allowClear
          prefix={<UserOutlined />}
          placeholder="Введите имя"
          maxLength={255}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
        />
      </FormItem>
      <Typography.Text type="secondary">Пример: Иван</Typography.Text>
    </Flex>
  );
}

export default UserFirstnameInput;

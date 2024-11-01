import React, { useCallback, useEffect, useState } from "react";
import { Flex, Input, Typography, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import "./sass/user.scss";
import { handlePaste } from "@utils";

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

function UserPatronymicInput({ name, initialValue }) {
  const [hasFeedback, setHasFeedback] = useState(false);

  useEffect(() => {
    setHasFeedback(initialValue && initialValue.length > 0);
  }, [initialValue]);

  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const handleChange = (e) => {
    setHasFeedback(e.target.value.length > 0);
  };

  return (
    <Flex vertical className="user__patronymic-input__flex">
      <Typography.Text>Отчество (если таковое имеется)</Typography.Text>
      <FormItem
        name={name}
        hasFeedback={hasFeedback}
        validateFirst
        rules={rules}
        className="user__patronymic-input__formitem"
      >
        <Input
          prefix={<UserOutlined />}
          allowClear
          placeholder="Введите отчество"
          maxLength={255}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
          onChange={handleChange}
          defaultValue={initialValue}
        />
      </FormItem>
      <Typography.Text type="secondary">Пример: Иванович</Typography.Text>
    </Flex>
  );
}

export default UserPatronymicInput;

import React from "react";
import { Form, FormItem } from "antd"; // Импортируем FormItem
import { Flex, Input, Space, Typography } from "antd";
import { FlagOutlined } from "@ant-design/icons";
import "./sass/events.scss";

function CompitationNameInput({ value, onInputChange }) {
  const handleChange = (event) => {
    onInputChange(event.target.value);
  };

  return (
    <Form.Item
      name="compitation"
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: "Пожалуйста,введите название компитенции",
        },
        {
          min: 5,
          message: "Минимальное значение 5",
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text className="events__compitation-name__text">
          Название компетенции
        </Typography.Text>
        <Input
          className="events__compitation-name__input"
          placeholder="Введите название"
          maxLength={30}
          prefix={<FlagOutlined />}
          value={value}
          onChange={handleChange}
        ></Input>
        <Typography.Text type="secondary">Пример: Робофутбол</Typography.Text>
      </Flex>
    </Form.Item>
  );
}

export default CompitationNameInput;

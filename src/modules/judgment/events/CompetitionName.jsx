import React from "react";
import { Form, FormItem } from "antd";
import { Flex, Input, Space, Typography } from "antd";
import { FlagOutlined } from "@ant-design/icons";
import "./sass/events.scss";

function CompitationNameInput({ value, onInputChange }) {
  const handleChange = (event) => {
    onInputChange(event.target.value);
  };

  return (
    <div className="events_compitation-name__div">
      <Typography.Text className="events__compitation-name__text">
        Название компетенции
      </Typography.Text>
      <Flex direction="column" align="stretch">
        <Space.Compact className="events__compitation-name__space">
          <Form.Item
            name="compitation"
            hasFeedback
            validateFirst
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите название компетенции",
              },
              {
                min: 5,
                message: "Минимальное значение 5",
              },
            ]}
          >
            <Input
              className="events__compitation-name__input"
              placeholder="Введите название"
              maxLength={30}
              prefix={<FlagOutlined />}
              value={value}
              onChange={handleChange}
            />
          </Form.Item>
          <Typography.Text
            type="secondary"
            className="events__compitation-name__example"
          >
            Пример: Робофутбол
          </Typography.Text>
        </Space.Compact>
      </Flex>
    </div>
  );
}

export default CompitationNameInput;

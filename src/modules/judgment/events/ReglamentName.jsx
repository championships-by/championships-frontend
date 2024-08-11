import React, { useState } from "react";
import { Typography, Input, Form, Space } from "antd"; 
import {LinkOutlined } from "@ant-design/icons";
const {Text} = Typography

function ReglamentName() {
  const [inputValue, setInputValue] = useState("");
  const [hasHttp, setHasHttp] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);

    
    if (!value.startsWith("http://") && !value.startsWith("https://")) {
      setHasHttp(false);
    } else {
      setHasHttp(true);
    }
  };

  return (
    <Form.Item
      name="reglament"
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: "Вставьте ссылку на регламент",
        },
        {
          validator: (_, value) => {
            if (!hasHttp) {
              return Promise.reject(new Error("Ссылка не соответствует допустимому шаблону"));
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <Space direction="vertical" size={2}>
        <Typography.Text className="events__competition-reglament__text">Регламент</Typography.Text>
        <Input
          prefix={<LinkOutlined/>}
          placeholder="Вставьте ссылку на регламент"
          value={inputValue}
          onChange={handleChange}
          className="events__competition-reglament__input"
        />
        <Typography.Text type="secondary">
          Пример: http://google.com или https://google.com
        </Typography.Text>
        <Text  type="danger">
          ВНИМАНИЕ!Проверьте права доступа к файлу
        </Text>
      </Space>
    </Form.Item>
  );
}

export default ReglamentName;
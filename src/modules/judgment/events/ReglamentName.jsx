import React, { useState } from "react";
import { Typography, Input, Form, Space } from "antd";
import { LinkOutlined } from "@ant-design/icons";
const { Text } = Typography;

function ReglamentName({ name, value, onInputChange }) {
  const [hasHttp, setHasHttp] = useState(true);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.startsWith("http://") || value.startsWith("https://")) {
      setHasHttp(true);
    } else {
      setHasHttp(false);
    }
    onInputChange(value);
  };

  return (
    <Form.Item
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          whitespace: true,
          message: "Вставьте ссылку на регламент",
        },
        {
          validator: (_, value) => {
            if (!hasHttp) {
              return Promise.reject(
                new Error("Ссылка должна начинаться с 'http://' или 'https://'")
              );
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <Space direction="vertical" size={2}>
        <Typography.Text className="events__competition-reglament__text">
          Регламент
        </Typography.Text>
        <Input
          prefix={<LinkOutlined />}
          placeholder="Вставьте ссылку на регламент"
          value={value}
          onChange={handleChange}
          className="events__competition-reglament__input"
        />
        <Typography.Text type="secondary">
          Пример: http://google.com или https://google.com
        </Typography.Text>
        <Text type="danger">ВНИМАНИЕ! Проверьте права доступа к файлу</Text>
      </Space>
    </Form.Item>
  );
}

export default ReglamentName;

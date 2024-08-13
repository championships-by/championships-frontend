import React, { useState } from "react";
import { Typography, Input, Form, Space } from "antd";

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
          message: "Введите название компетенции",
        },
        {
          validator: (_, value) => {
            if (!hasHttp) {
              return Promise.reject(
                new Error("Ссылка не соответствует допустимому шаблону")
              );
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <Space direction="vertical">
        <Typography.Text strong>Регламент</Typography.Text>
        <Input
          placeholder="Вставьте ссылку на регламент"
          value={inputValue}
          onChange={handleChange}
          className="events__competition-reglament__input"
        />
        <Typography.Text type="secondary">
          Пример: http://google.com или https://google.com
        </Typography.Text>
        <Typography.Text type="danger">
          *Внимательно проверьте права доступа к файлу
        </Typography.Text>
      </Space>
    </Form.Item>
  );
}

export default ReglamentName;
